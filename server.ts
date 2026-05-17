import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import { parseStringPromise } from "xml2js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const DOMAIN_MAPPING: Record<string, string> = {
  LV: "10YLV-1001A00074",
  EE: "10Y1001A1001A39W",
  LT: "10YLT-1001A0008Q",
  FI: "10YFI-1001A0001V",
  SE1: "10Y1001A1001A44P",
  SE2: "10Y1001A1001A45N",
  SE3: "10Y1001A1001A46L",
  SE4: "10Y1001A1001A47J",
  DE: "10Y1001A1001A83F",
  AT: "10YAT-STREIT---L",
  DK1: "10YDK-1-------W",
  DK2: "10YDK-2-------M",
  NO1: "10YNO-1-------2",
  NO2: "10YNO-2-------T",
  NO3: "10YNO-3-------V",
  NO4: "10YNO-4-------9",
  NO5: "10YNO-5-------E",
  PL: "10YPL-AREA-----S",
  FR: "10YFR-1001A00010",
  ES: "10YES-REE------0",
  IT: "10YIT-1001A0001V",
  NL: "10YNL----------L",
  BE: "10YBE----------2",
  PT: "10YPT-REN------W",
  // Additional EU bidding zones
  BG: "10YCA-BULGARIA-R",
  CZ: "10YCZ-CEPS-----N",
  GR: "10YGR-HTSO-----Y",
  HU: "10YHU-MAVIR----U",
  IE: "10Y1001A1001A59C",
  RO: "10YRO-TEL------P",
  SI: "10YSI-ELES-----O",
  SK: "10YSK-SEPS-----K",
  HR: "10YHR-HEP------M"
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.use(express.json());

app.get("/api/prices", async (req, res) => {
  const country = (req.query.country as string) || "LV";
  const domain = DOMAIN_MAPPING[country];

  if (!domain) return res.status(400).json({ error: "Unsupported country code" });

  const token = process.env.ENTSOE_API_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "ENTSOE_API_TOKEN is missing.", isMissingToken: true });
  }

  try {
    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setDate(end.getDate() + 2);
    end.setHours(0, 0, 0, 0);

    const format = (d: Date) => d.toISOString().replace(/[:-]/g, "").split(".")[0].replace("T", "").slice(0, 12);
    const periodStart = format(start);
    const periodEnd = format(end);

    const url = `https://web-api.tp.entsoe.eu/api?securityToken=${token}&documentType=A44&in_Domain=${domain}&out_Domain=${domain}&periodStart=${periodStart}&periodEnd=${periodEnd}`;
    
    const response = await axios.get(url, { timeout: 15000 });
    const result = await parseStringPromise(response.data);

    if (result.Acknowledgement_MarketDocument) {
      const reason = result.Acknowledgement_MarketDocument.Reason?.[0]?.text?.[0];
      console.error("ENTSO-E API Acknowledgement Error:", reason);
      return res.status(500).json({ error: reason || "API refused request" });
    }

    const timeSeries = result.Publication_MarketDocument?.TimeSeries;
    if (!timeSeries) return res.json({ prices: [] });

    const prices: { time: string; value: number }[] = [];

    timeSeries.forEach((ts: any) => {
      const period = ts.Period[0];
      const startStr = period.timeInterval[0].start[0];
      const resolution = period.resolution[0];
      const points = period.Point;

      points.forEach((p: any) => {
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
    res.json({ prices });
  } catch (error: any) {
    console.error("ENTSO-E API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch prices from ENTSO-E" });
  }
});

app.post("/api/advice", async (req, res) => {
  const { prices, country, locale } = req.body;
  if (!prices || !Array.isArray(prices)) return res.status(400).json({ error: "Prices needed" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      As an energy saving expert, review these electricity prices (ct/kWh) for the next 48h in ${country}.
      Provide 3 useful tips specifically for ${locale || 'lv'} language.
      Identify cheap slots and give household advice.
      Prices:
      ${prices.slice(0, 48).map(p => `${p.time}: ${p.value} ct/kWh`).join("\n")}
      Respond with a JSON array of 3 strings only.
    `;
    const result = await model.generateContent(prompt);
    const text = result.response.text().match(/\[.*\]/s)?.[0] || '[]';
    res.json({ advice: JSON.parse(text) });
  } catch (e) {
    res.status(500).json({ error: "Advice failed" });
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