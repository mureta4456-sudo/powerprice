import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Zap, AlertTriangle, CheckCircle2, Globe, BarChart3, Lightbulb, 
  Info, ChevronRight, Clock, Calculator, Languages, HelpCircle, BookOpen, Download
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, AreaChart, Area 
} from "recharts";
import { format, isSameDay, addHours, startOfHour, parseISO, isAfter } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import "./i18n";

interface Price {
  time: string;
  value: number;
}

const COUNTRIES = [
  { code: "LV", name: "Latvija" }, { code: "EE", name: "Eesti" }, { code: "LT", name: "Lietuva" },
  { code: "FI", name: "Suomi" }, { code: "DE", name: "Deutschland" }, { code: "AT", name: "Österreich" },
  { code: "DK1", name: "Danmark (W)" }, { code: "DK2", name: "Danmark (E)" }, { code: "SE3", name: "Sverige" },
  { code: "NL", name: "Nederland" }, { code: "BE", name: "België" }, { code: "PT", name: "Portugal" },
  { code: "FR", name: "France" }, { code: "ES", name: "España" }, { code: "IT", name: "Italia" },
  { code: "PL", name: "Polska" }, { code: "NO3", name: "Norge (Trondheim)" }, { code: "SE1", name: "Sverige (Luleå)" }
];

const LANGUAGES = [
  { code: "lv", name: "Latviešu" }, { code: "en", name: "English" }, { code: "de", name: "Deutsch" }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState("LV");
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState<"today" | "tomorrow">("today");
  const [advice, setAdvice] = useState<string[]>([]);
  const [fetchingAdvice, setFetchingAdvice] = useState(false);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prices?country=${country}`);
      const data = await res.json();
      if (data.prices) setPrices(data.prices);
      if (data.prices?.length) {
        setFetchingAdvice(true);
        const advRes = await fetch("/api/advice", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prices: data.prices, country, locale: i18n.language })
        });
        const advData = await advRes.json();
        setAdvice(advData.advice || []);
        setFetchingAdvice(false);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [country, i18n.language]);

  useEffect(() => { fetchPrices(); }, [fetchPrices]);

  const targetPrices = useMemo(() => {
    const target = viewDate === "today" ? new Date() : addHours(new Date(), 24);
    return prices.filter(p => isSameDay(parseISO(p.time), target));
  }, [prices, viewDate]);

  const currentPrice = useMemo(() => {
    const now = new Date().toISOString().substring(0, 14) + "00:00.000Z";
    return prices.find(p => p.time === now) || targetPrices[0];
  }, [prices, targetPrices]);

  const avgPrice = useMemo(() => {
    if (!targetPrices.length) return 0;
    return targetPrices.reduce((a, b) => a + b.value, 0) / targetPrices.length;
  }, [targetPrices]);

  const status = useMemo(() => {
    if (!currentPrice) return { color: "text-slate-400", bg: "bg-slate-100", label: "?", icon: Info };
    if (currentPrice.value < avgPrice * 0.8) return { color: "text-emerald-600", bg: "bg-emerald-50", label: t("status_low"), icon: CheckCircle2 };
    if (currentPrice.value > avgPrice * 1.2) return { color: "text-rose-600", bg: "bg-rose-50", label: t("status_high"), icon: AlertTriangle };
    return { color: "text-amber-500", bg: "bg-amber-50", label: t("status_mid"), icon: Zap };
  }, [currentPrice, avgPrice, t]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={24} className="text-emerald-500" fill="currentColor" />
            <h1 className="text-xl font-bold tracking-tight">{t("app_name")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)} className="bg-slate-100 px-2 py-1 rounded text-xs font-bold outline-none">
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
            <select value={country} onChange={e => setCountry(e.target.value)} className="bg-slate-100 px-2 py-1 rounded text-xs font-bold outline-none">
              {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        <section className={`p-8 rounded-3xl ${status.bg} border border-white/50 shadow-sm transition-all`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4">
              <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${status.color}`}>
                <status.icon size={18} /> {status.label}
              </div>
              <h2 className="text-7xl md:text-8xl font-black tabular-nums tracking-tighter">
                {currentPrice?.value.toFixed(2) || "0.00"}
                <span className="text-2xl font-bold text-slate-300 ml-3">{t("unit")}</span>
              </h2>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-white shadow-sm min-w-[140px]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t("avg")}</div>
              <div className="text-2xl font-black">{avgPrice.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-2 p-1 bg-slate-200/50 rounded-xl w-fit">
            <button onClick={() => setViewDate("today")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewDate === "today" ? "bg-white shadow text-emerald-600" : "text-slate-500"}`}>{t("today")}</button>
            <button onClick={() => setViewDate("tomorrow")} disabled={prices.length < 24} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewDate === "tomorrow" ? "bg-white shadow text-emerald-600" : "text-slate-500 disabled:opacity-50"}`}>{t("tomorrow")}</button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-8 text-emerald-500 font-bold"><BarChart3 size={20} /><h3>{t("app_name")}</h3></div>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <AreaChart data={targetPrices.map(p => ({ time: format(parseISO(p.time), "HH:mm"), value: p.value }))}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} interval={3} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0/0.1)'}} />
                <ReferenceLine y={avgPrice} stroke="#94a3b8" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#g)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 font-bold mb-2"><Lightbulb size={20} className="text-yellow-500" /><h3>{t("tips_title")}</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fetchingAdvice ? [1,2,3].map(i => <div key={i} className="h-40 bg-white rounded-2xl animate-pulse" />) :
              advice.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-all">
                  <p className="text-sm font-medium leading-relaxed">{item}</p>
                </div>
              ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-bold"><HelpCircle size={20} className="text-blue-500" /><h3>{t("faq_title")}</h3></div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-sm mb-1">{t(`q${i}`)}</h4>
                  <p className="text-xs text-slate-500">{t(`a${i}`)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 font-bold"><BookOpen size={20} className="text-emerald-500" /><h3>{t("blog_title")}</h3></div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                  <h4 className="font-bold text-sm mb-1 flex items-center justify-between">{t(`blog${i}_title`)} <ChevronRight size={14} className="group-hover:translate-x-1 transition-all" /></h4>
                  <p className="text-xs text-slate-500">{t(`blog${i}_summary`)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-slate-800 p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t("install_app")}</h3>
              <p className="text-slate-400 text-sm">Pievieno PowerPrice sākuma ekrānam un seko cenām katru dienu.</p>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
              <Download size={20} /> {t("install_app")}
            </button>
          </div>
          <Zap className="absolute bottom-[-10px] right-[-30px] w-48 h-48 text-emerald-500/10 rotate-12" />
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-400 space-y-4 pt-12">
        <p>{t("source_info")}</p>
        <p>© 2024 PowerPrice</p>
      </footer>
    </div>
  );
}
