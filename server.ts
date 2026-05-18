import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import { parseStringPromise } from "xml2js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const DOMAIN_MAPPING: Record<string, string> = {
  LV: "10YLV-1001A00074", EE: "10Y1001A1001A39W", LT: "10YLT-1001A0008Q",
  FI: "10YFI-1001A0001V", SE1: "10Y1001A1001A44P", SE2: "10Y1001A1001A45N",
  SE3: "10Y1001A1001A46L", SE4: "10Y1001A1001A47J", DE: "10Y1001A1001A83F",
  AT: "10YAT-STREIT---L", DK1: "10YDK-1-------W", DK2: "10YDK-2-------M",
  NO1: "10YNO-1-------2", NO2: "10YNO-2-------T", NO3: "10YNO-3-------V",
  NO4: "10YNO-4-------9", NO5: "10YNO-5-------E", PL: "10YPL-AREA-----S",
  FR: "10YFR-1001A00010", ES: "10YES-REE------0", IT: "10YIT-1001A0001V",
  NL: "10YNL----------L", BE: "10YBE----------2", PT: "10YPT-REN------W",
  BG: "10YCA-BULGARIA-R", CZ: "10YCZ-CEPS-----N", GR: "10YGR-HTSO-----Y",
  HU: "10YHU-MAVIR----U", IE: "10Y1001A1001A59C", RO: "10YRO-TEL------P",
  SI: "10YSI-ELES-----O", SK: "10YSK-SEPS-----K", HR: "10YHR-HEP------M"
};

const LANGUAGE_NAMES: Record<string, string> = {
  lv: "Latvian", en: "English", de: "German", fr: "French", es: "Spanish",
  et: "Estonian", lt: "Lithuanian", fi: "Finnish", sv: "Swedish", da: "Danish",
  nl: "Dutch", pl: "Polish", cs: "Czech", sk: "Slovak", hu: "Hungarian",
  it: "Italian", pt: "Portuguese", ro: "Romanian", bg: "Bulgarian", el: "Greek",
  hr: "Croatian", sl: "Slovenian", mt: "Maltese", ga: "Irish"
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
app.use(express.json());

type Cached<T> = { data: T; expires: number };
const priceCache = new Map<string, Cached<any[]>>();
const adviceCache = new Map<string, Cached<string[]>>();
const PRICE_TTL_MS = 30 * 60 * 1000;
const ADVICE_TTL_MS = 4 * 60 * 60 * 1000;

function getFresh<T>(map: Map<string, Cached<T>>, key: string): T | null {
  const hit = map.get(key);
  if (hit && hit.expires > Date.now()) return hit.data;
  return null;
}

async function fetchPricesFromEntsoe(country: string, token: string) {
  const domain = DOMAIN_MAPPING[country];
  if (!domain) throw new Error("Unsupported country code");
  const now = new Date();
  const start = new Date(now); start.setHours(0, 0, 0, 0);
  const end = new Date(now); end.setDate(end.getDate() + 2); end.setHours(0, 0, 0, 0);
  const fmt = (d: Date) => d.toISOString().replace(/[:-]/g, "").split(".")[0].replace("T", "").slice(0, 12);
  const url = `https://web-api.tp.entsoe.eu/api?securityToken=${token}&documentType=A44&in_Domain=${domain}&out_Domain=${domain}&periodStart=${fmt(start)}&periodEnd=${fmt(end)}`;
  const response = await axios.get(url, { timeout: 15000 });
  const result = await parseStringPromise(response.data);
  if (result.Acknowledgement_MarketDocument) {
    const reason = result.Acknowledgement_MarketDocument.Reason?.[0]?.text?.[0];
    throw new Error(reason || "API refused request");
  }
  const timeSeries = result.Publication_MarketDocument?.TimeSeries;
  if (!timeSeries) return [];
  const prices: { time: string; value: number }[] = [];
  timeSeries.forEach((ts: any) => {
    const period = ts.Period[0];
    const startStr = period.timeInterval[0].start[0];
    const resolution = period.resolution[0];
    period.Point.forEach((p: any) => {
      const position = parseInt(p.position[0]);
      const priceAmount = parseFloat(p["price.amount"][0]);
      const pointTime = new Date(startStr);
      if (resolution === "PT60M" || resolution === "PT1H") {
        pointTime.setHours(pointTime.getHours() + position - 1);
      } else if (resolution === "PT15M") {
        pointTime.setMinutes(pointTime.getMinutes() + (position - 1) * 15);
      }
      prices.push({ time: pointTime.toISOString(), value: priceAmount / 10 });
    });
  });
  prices.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  return prices;
}

app.get("/api/prices", async (req, res) => {
  const country = (req.query.country as string) || "LV";
  if (!DOMAIN_MAPPING[country]) return res.status(400).json({ error: "Unsupported country code" });
  const token = process.env.ENTSOE_API_TOKEN;
  if (!token) return res.status(500).json({ error: "ENTSOE_API_TOKEN is missing.", isMissingToken: true });
  const cached = getFresh(priceCache, country);
  if (cached) return res.json({ prices: cached, cached: true });
  try {
    const prices = await fetchPricesFromEntsoe(country, token);
    priceCache.set(country, { data: prices, expires: Date.now() + PRICE_TTL_MS });
    res.json({ prices });
  } catch (error: any) {
    console.error("ENTSO-E API Error:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch prices from ENTSO-E" });
  }
});

/**
 * Extract a JSON array of strings from arbitrary model output.
 * Handles plain JSON, markdown-wrapped JSON, and noisy responses.
 */
function extractAdviceArray(raw: string): string[] {
  if (!raw) return [];
  // Strip Markdown code fences
  const cleaned = raw.replace(/```(?:json)?\s*/g, "").replace(/```/g, "").trim();
  // Try direct parse first
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed.filter(x => typeof x === "string");
    if (parsed && typeof parsed === "object") {
      // Maybe wrapped in { advice: [...] } or { tips: [...] }
      const arr = parsed.advice || parsed.tips || parsed.items || Object.values(parsed).find(v => Array.isArray(v));
      if (Array.isArray(arr)) return arr.filter((x: any) => typeof x === "string");
    }
  } catch { /* fall through */ }
  // Try to find the largest array-looking substring
  const matches = [...cleaned.matchAll(/\[[\s\S]*?\]/g)].map(m => m[0]);
  for (const candidate of matches.sort((a, b) => b.length - a.length)) {
    try {
      const parsed = JSON.parse(candidate);
      if (Array.isArray(parsed)) return parsed.filter(x => typeof x === "string");
    } catch { /* try next */ }
  }
  return [];
}

app.post("/api/advice", async (req, res) => {
  const { prices, country, locale } = req.body;
  if (!prices || !Array.isArray(prices)) return res.status(400).json({ error: "Prices needed" });

  const cacheKey = `${country}:${locale || "lv"}`;
  const cached = getFresh(adviceCache, cacheKey);
  if (cached) return res.json({ advice: cached, cached: true });

  if (!process.env.GEMINI_API_KEY) {
    console.error("[advice] GEMINI_API_KEY is not set");
    return res.status(500).json({ error: "GEMINI_API_KEY missing", advice: [] });
  }

  const langCode = (locale || "lv").split("-")[0];
  const languageName = LANGUAGE_NAMES[langCode] || "English";

  // Build a compact price summary the model can reason about
  const slice = prices.slice(0, 48) as { time: string; value: number }[];
  const priceLines = slice.map(p => `${p.time}: ${p.value.toFixed(2)}`).join("\n");

  const prompt = `You are a household energy-saving expert. Below are spot electricity prices (ct/kWh) for the next 48 hours in country ${country}.

Write EXACTLY 3 short, practical tips for a household. Each tip must:
- be 1–2 sentences only
- mention at least one specific clock-hour or time window from the data
- suggest a concrete action (laundry, dishwasher, water heater, EV charging, etc.)
- be written ENTIRELY in ${languageName}

PRICES:
${priceLines}

Return ONLY a JSON array of exactly 3 strings, no other text. Example: ["tip 1", "tip 2", "tip 3"]`;

  try {
    // Try the modern flash model first; if SDK rejects it, fall back to 1.5-flash.
    let model;
    try {
      model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: { responseMimeType: "application/json", temperature: 0.7 }
      });
    } catch {
      model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json", temperature: 0.7 }
      });
    }

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const advice = extractAdviceArray(raw);

    if (!advice.length) {
      console.error("[advice] Empty/unparseable model output:", raw.slice(0, 500));
      return res.status(502).json({ error: "Model returned no usable tips", advice: [] });
    }

    adviceCache.set(cacheKey, { data: advice, expires: Date.now() + ADVICE_TTL_MS });
    res.json({ advice });
  } catch (e: any) {
    console.error("[advice] Generation failed:", e?.message || e, e?.stack?.split("\n")?.[0]);
    res.status(500).json({ error: e?.message || "Advice failed", advice: [] });
  }
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => res.sendFile(path.join(process.cwd(), "dist/index.html")));
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`Server: http://localhost:${PORT}`));
}
start();
