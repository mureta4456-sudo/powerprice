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
  const startUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  const endUtc   = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 2, 0, 0, 0));

  const fmt = (d: Date) =>
    d.toISOString().replace(/[:-]/g, "").split(".")[0].replace("T", "").slice(0, 12);

  const url = `https://web-api.tp.entsoe.eu/api?securityToken=${token}&documentType=A44&in_Domain=${domain}&out_Domain=${domain}&periodStart=${fmt(startUtc)}&periodEnd=${fmt(endUtc)}`;

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
        pointTime.setUTCHours(pointTime.getUTCHours() + position - 1);
      } else if (resolution === "PT15M") {
        pointTime.setUTCMinutes(pointTime.getUTCMinutes() + (position - 1) * 15);
      }

      prices.push({
        time: pointTime.toISOString(),
        value: priceAmount / 10
      });
    });
  });

  prices.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return prices;
}

app.get("/api/prices", async (req, res) => {
  const country = (req.query.country as string) || "LV";

  if (!DOMAIN_MAPPING[country]) {
    return res.status(400).json({ error: "Unsupported country code" });
  }

  const token = process.env.ENTSOE_API_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "ENTSOE_API_TOKEN is missing.",
      isMissingToken: true
    });
  }

  const cached = getFresh(priceCache, country);

  if (cached) {
    return res.json({ prices: cached, cached: true });
  }

  try {
    const prices = await fetchPricesFromEntsoe(country, token);

    priceCache.set(country, {
      data: prices,
      expires: Date.now() + PRICE_TTL_MS
    });

    res.json({ prices });

  } catch (error: any) {
    console.error("ENTSO-E API Error:", error.message);

    res.status(500).json({
      error: error.message || "Failed to fetch prices from ENTSO-E"
    });
  }
});

async function start() {
  if (process.env.NODE_ENV !== "production") {

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });

    app.use(vite.middlewares);

  } else {

    const distPath = path.join(process.cwd(), "dist");

    // FIX priekš Render cache problēmas
    app.use(express.static(distPath, {
      etag: true,
      maxAge: "1y",
      immutable: true,

      setHeaders: (res, filePath) => {

        // index.html NEKEŠOJAM
        if (filePath.endsWith("index.html")) {
          res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
          );

          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
      }
    }));

    app.get("*", (req, res) => {

      // papildus drošība
      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );

      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server: http://localhost:${PORT}`);
  });
}

start();
