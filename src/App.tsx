import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Zap, AlertTriangle, CheckCircle2, BarChart3, Lightbulb,
  Info, ChevronRight, HelpCircle, BookOpen, Download, ArrowLeft, Calendar, Clock, Tag, RefreshCw
} from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, AreaChart, Area
} from "recharts";
import { format, isSameDay, addHours, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import "./i18n";
import { posts, getPostById, getTranslation, BlogPost } from "./blogPosts";

interface Price {
  time: string;
  value: number;
}

const COUNTRIES = [
  { code: "LV", name: "Latvija" }, { code: "EE", name: "Eesti" }, { code: "LT", name: "Lietuva" },
  { code: "FI", name: "Suomi" }, { code: "DE", name: "Deutschland" }, { code: "AT", name: "Österreich" },
  { code: "DK1", name: "Danmark (W)" }, { code: "DK2", name: "Danmark (E)" },
  { code: "SE1", name: "Sverige (Luleå)" }, { code: "SE3", name: "Sverige (Sthlm)" },
  { code: "NL", name: "Nederland" }, { code: "BE", name: "België" }, { code: "PT", name: "Portugal" },
  { code: "FR", name: "France" }, { code: "ES", name: "España" }, { code: "IT", name: "Italia" },
  { code: "PL", name: "Polska" }, { code: "CZ", name: "Česko" }, { code: "SK", name: "Slovensko" },
  { code: "HU", name: "Magyarország" }, { code: "RO", name: "România" }, { code: "BG", name: "България" },
  { code: "GR", name: "Ελλάδα" }, { code: "SI", name: "Slovenija" }, { code: "HR", name: "Hrvatska" },
  { code: "IE", name: "Éire" }, { code: "NO3", name: "Norge (Trondheim)" }
];

const LANGUAGES = [
  { code: "bg", name: "Български" }, { code: "hr", name: "Hrvatski" },
  { code: "cs", name: "Čeština" }, { code: "da", name: "Dansk" },
  { code: "de", name: "Deutsch" }, { code: "el", name: "Ελληνικά" },
  { code: "en", name: "English" }, { code: "es", name: "Español" },
  { code: "et", name: "Eesti" }, { code: "fi", name: "Suomi" },
  { code: "fr", name: "Français" }, { code: "ga", name: "Gaeilge" },
  { code: "hu", name: "Magyar" }, { code: "it", name: "Italiano" },
  { code: "lt", name: "Lietuvių" }, { code: "lv", name: "Latviešu" },
  { code: "mt", name: "Malti" }, { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" }, { code: "pt", name: "Português" },
  { code: "ro", name: "Română" }, { code: "sk", name: "Slovenčina" },
  { code: "sl", name: "Slovenščina" }, { code: "sv", name: "Svenska" }
];

type Route =
  | { view: "home" }
  | { view: "blog" }
  | { view: "post"; id: string };

function parseHash(): Route {
  const h = window.location.hash.replace(/^#/, "");
  if (h.startsWith("/blog/")) return { view: "post", id: h.slice("/blog/".length) };
  if (h === "/blog") return { view: "blog" };
  return { view: "home" };
}

function navigate(route: Route) {
  const h =
    route.view === "home" ? "/" :
    route.view === "blog" ? "/blog" :
    `/blog/${route.id}`;
  if (window.location.hash !== `#${h}`) window.location.hash = h;
}

function MarkdownView({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  const inline = (s: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let rest = s;
    let key = 0;
    const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
    const boldRe = /\*\*([^*]+)\*\*/;
    while (rest.length) {
      const link = linkRe.exec(rest);
      const bold = boldRe.exec(rest);
      const first =
        link && (!bold || link.index < bold.index) ? { kind: "link" as const, m: link } :
        bold ? { kind: "bold" as const, m: bold } : null;
      if (!first) { parts.push(rest); break; }
      const idx = first.m.index;
      if (idx > 0) parts.push(rest.slice(0, idx));
      if (first.kind === "link") {
        parts.push(<a key={key++} href={first.m[2]} className="text-emerald-600 underline" target="_blank" rel="noreferrer">{first.m[1]}</a>);
      } else {
        parts.push(<strong key={key++} className="font-bold">{first.m[1]}</strong>);
      }
      rest = rest.slice(idx + first.m[0].length);
    }
    return parts;
  };

  return (
    <div className="space-y-4 text-slate-700 leading-relaxed">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) return <h3 key={i} className="text-lg font-bold mt-6 mb-2 text-slate-900">{inline(block.slice(4))}</h3>;
        if (block.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-3 text-slate-900">{inline(block.slice(3))}</h2>;
        if (/^\d+\.\s/.test(block)) {
          const items = block.split(/\n/).map(l => l.replace(/^\d+\.\s+/, ""));
          return <ol key={i} className="list-decimal pl-6 space-y-2">{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ol>;
        }
        if (block.startsWith("- ")) {
          const items = block.split(/\n/).map(l => l.replace(/^- /, ""));
          return <ul key={i} className="list-disc pl-6 space-y-2">{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>;
        }
        return <p key={i}>{inline(block)}</p>;
      })}
    </div>
  );
}

// ─────────────────────────────────────────── HOME ───
function HomeView() {
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState("LV");
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState<"today" | "tomorrow">("today");
  const [advice, setAdvice] = useState<string[]>([]);
  const [fetchingAdvice, setFetchingAdvice] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    const installed = () => setInstallPrompt(null);
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installed);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installed);
    };
  }, []);

  const isIos = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone = typeof window !== "undefined" && (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
  );
  const canInstall = (installPrompt || isIos) && !isStandalone;

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === "accepted") setInstallPrompt(null);
    } else if (isIos) {
      alert("Lai instalētu lietotni: pieskaries dalīšanās ikonai ↑ un izvēlies 'Pievienot sākuma ekrānam' / 'Add to Home Screen'.");
    }
  };

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/prices?country=${country}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setPrices([]);
      } else if (data.prices) {
        setPrices(data.prices);
        setLastUpdated(new Date());
      }
      if (data.prices?.length) {
        setFetchingAdvice(true);
        try {
          const advRes = await fetch("/api/advice", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prices: data.prices, country, locale: i18n.language })
          });
          const advData = await advRes.json();
          setAdvice(advData.advice || []);
        } catch {
          setAdvice([]);
        }
        setFetchingAdvice(false);
      }
    } catch (e) {
      console.error(e);
      setError("Network error");
    }
    setLoading(false);
  }, [country, i18n.language]);

  useEffect(() => { fetchPrices(); }, [fetchPrices]);

  const targetPrices = useMemo(() => {
    const target = viewDate === "today" ? new Date() : addHours(new Date(), 24);
    return prices.filter(p => isSameDay(parseISO(p.time), target));
  }, [prices, viewDate]);

  const currentPrice = useMemo(() => {
    const nowHour = new Date();
    nowHour.setMinutes(0, 0, 0);
    return prices.find(p => parseISO(p.time).getTime() === nowHour.getTime()) || targetPrices[0];
  }, [prices, targetPrices]);

  const avgPrice = useMemo(() => {
    if (!targetPrices.length) return 0;
    return targetPrices.reduce((a, b) => a + b.value, 0) / targetPrices.length;
  }, [targetPrices]);

  const status = useMemo(() => {
    if (!currentPrice) return { color: "text-slate-400", bg: "bg-slate-100", label: t("status_unknown"), icon: Info };
    if (currentPrice.value < avgPrice * 0.8) return { color: "text-emerald-600", bg: "bg-emerald-50", label: t("status_low"), icon: CheckCircle2 };
    if (currentPrice.value > avgPrice * 1.2) return { color: "text-rose-600", bg: "bg-rose-50", label: t("status_high"), icon: AlertTriangle };
    return { color: "text-amber-500", bg: "bg-amber-50", label: t("status_mid"), icon: Zap };
  }, [currentPrice, avgPrice, t]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <div className="flex justify-end">
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-bold outline-none"
          aria-label="Country"
        >
          {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
      </div>
      <section className={`p-8 rounded-3xl ${status.bg} border border-white/50 shadow-sm transition-all`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${status.color}`}>
              <status.icon size={18} /> {status.label}
            </div>
            <h2 className="text-7xl md:text-8xl font-black tabular-nums tracking-tighter">
              {loading ? "…" : (currentPrice?.value.toFixed(2) || "0.00")}
              <span className="text-2xl font-bold text-slate-300 ml-3">{t("unit")}</span>
            </h2>
            {error && <p className="text-rose-600 text-sm font-medium">{error}</p>}
          </div>
          <div className="bg-white/80 p-4 rounded-2xl border border-white shadow-sm min-w-[140px]">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t("avg")}</div>
            <div className="text-2xl font-black">{avgPrice.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl w-fit">
            <button onClick={() => setViewDate("today")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewDate === "today" ? "bg-white shadow text-emerald-600" : "text-slate-500"}`}>{t("today")}</button>
            <button onClick={() => setViewDate("tomorrow")} disabled={prices.length < 24} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewDate === "tomorrow" ? "bg-white shadow text-emerald-600" : "text-slate-500 disabled:opacity-50"}`}>{t("tomorrow")}</button>
          </div>
          {lastUpdated && (
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={fetchPrices}
                disabled={loading}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-emerald-600 transition-colors disabled:opacity-50"
                title={t("refresh")}
              >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                <span>{t("last_updated")}: {format(lastUpdated, "dd.MM.yyyy HH:mm")}</span>
              </button>
              <span className="text-[10px] text-slate-400 tracking-wide">ENTSO-E</span>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-8 text-emerald-500 font-bold"><BarChart3 size={20} /><h3>{t("chart_title")}</h3></div>
        <div className="h-80 sm:h-72 w-full">
          <ResponsiveContainer>
            <AreaChart
              data={targetPrices.map(p => ({ time: format(parseISO(p.time), "HH:mm"), value: p.value }))}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                interval="preserveStartEnd"
                minTickGap={15}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} width={40} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0/0.1)' }} />
              <ReferenceLine y={avgPrice} stroke="#94a3b8" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#g)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 font-bold mb-2"><Lightbulb size={20} className="text-yellow-500" /><h3>{t("tips_title")}</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fetchingAdvice ? [1, 2, 3].map(i => <div key={i} className="h-40 bg-white rounded-2xl animate-pulse" />) :
            advice.length ? advice.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-all">
                <p className="text-sm font-medium leading-relaxed">{item}</p>
              </div>
            )) : (
              <p className="text-sm text-slate-500 col-span-3">{t("advice_failed")}</p>
            )}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-bold"><HelpCircle size={20} className="text-blue-500" /><h3>{t("faq_title")}</h3></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-sm mb-1">{t(`q${i}`)}</h4>
                <p className="text-xs text-slate-500">{t(`a${i}`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold"><BookOpen size={20} className="text-emerald-500" /><h3>{t("blog_title")}</h3></div>
            <button onClick={() => navigate({ view: "blog" })} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              {posts.length > 0 ? `${t("blog_read_more")} →` : ""}
            </button>
          </div>
          <div className="space-y-3">
            {posts.slice(0, 3).map(post => {
              const tr = getTranslation(post, i18n.language);
              return (
                <button
                  key={post.id}
                  onClick={() => navigate({ view: "post", id: post.id })}
                  className="w-full text-left bg-white p-4 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-emerald-200 cursor-pointer transition-colors group"
                >
                  <h4 className="font-bold text-sm mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-2"><span className="text-base">{post.cover}</span>{tr.title}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs text-slate-500">{tr.summary}</p>
                </button>
              );
            })}
            {posts.length === 0 && <p className="text-xs text-slate-400 italic">{t("blog_empty")}</p>}
          </div>
        </section>
      </div>

      {canInstall && (
        <section className="bg-slate-800 p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t("install_app")}</h3>
              <p className="text-slate-400 text-sm">{t("install_subtitle")}</p>
            </div>
            <button
              onClick={handleInstall}
              className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              <Download size={20} /> {t("install_app")}
            </button>
          </div>
          <Zap className="absolute bottom-[-10px] right-[-30px] w-48 h-48 text-emerald-500/10 rotate-12" />
        </section>
      )}
    </main>
  );
}

function BlogListView() {
  const { t, i18n } = useTranslation();
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <button onClick={() => navigate({ view: "home" })} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
        <ArrowLeft size={16} /> {t("home_back")}
      </button>
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <BookOpen size={28} className="text-emerald-500" />
          <h2 className="text-4xl font-black tracking-tight">{t("blog_title")}</h2>
        </div>
        <p className="text-slate-500">{t("blog_subtitle")}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-slate-400 italic">{t("blog_empty")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(post => {
            const tr = getTranslation(post, i18n.language);
            return (
              <button
                key={post.id}
                onClick={() => navigate({ view: "post", id: post.id })}
                className="text-left bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div className="text-4xl mb-3">{post.cover}</div>
                <div className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readMinutes} min</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors">{tr.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{tr.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">{tag}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-emerald-600 group-hover:gap-2 transition-all">
                  {t("blog_read_more")} <ChevronRight size={14} />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}

function PostView({ post }: { post: BlogPost }) {
  const { t, i18n } = useTranslation();
  const tr = getTranslation(post, i18n.language);
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <button onClick={() => navigate({ view: "blog" })} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
        <ArrowLeft size={16} /> {t("blog_back")}
      </button>
      <article className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-6xl">{post.cover}</div>
        <div className="text-xs font-bold text-slate-400 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
          <span className="flex items-center gap-1"><Clock size={12} />{post.readMinutes} min</span>
          <span className="flex items-center gap-1"><Tag size={12} />{post.tags.join(", ")}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">{tr.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed border-l-4 border-emerald-500 pl-4 italic">{tr.summary}</p>
        <div className="pt-4">
          <MarkdownView source={tr.content} />
        </div>
      </article>
    </main>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const handler = () => setRoute(parseHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    // SEO: update <title> and meta description per language
    document.title = t("page_title");
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", t("meta_description"));
  }, [i18n.language, t]);

  const post = route.view === "post" ? getPostById(route.id) : undefined;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate({ view: "home" })} className="flex items-center gap-2">
            <Zap size={24} classNam
