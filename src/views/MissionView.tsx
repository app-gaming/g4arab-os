import React from "react";
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  MapPin, 
  FileEdit, 
  Clock, 
  Globe, 
  Compass, 
  CheckCircle,
  Database,
  ArrowUpRight
} from "lucide-react";
import { NewsNexusItem } from "../types";

interface MissionViewProps {
  searchText: string;
  lang: "EN" | "AR";
  onSendToStudio: (engText: string) => void;
  onAutoDraft?: (brief: string) => void;
  setView: (view: any) => void;
}

export default function MissionView({ searchText, lang, onSendToStudio, onAutoDraft, setView }: MissionViewProps) {
  // Analytical Metrics SVG graphics with localization Support
  const outputMetrics = [
    { 
      label: lang === "EN" ? "OUTPUT VELOCITY" : "سرعة المخرجات التحريرية", 
      value: lang === "EN" ? "142 art/mo" : "١٤٢ مقال/شهر", 
      percent: 85, 
      color: "text-indigo-400" 
    },
    { 
      label: lang === "EN" ? "ACCURACY RATING" : "نسبة دقة البيانات", 
      value: "98.4%", 
      percent: 98, 
      color: "text-cyan-400" 
    },
    { 
      label: lang === "EN" ? "Riyadh API Latency" : "زمن استجابة خوادم الرياض", 
      value: lang === "EN" ? "4ms (LAN)" : "٤ مللي ثانية (LAN)", 
      percent: 95, 
      color: "text-emerald-400" 
    }
  ];

  const breakingLeaks = [
    {
      id: "leak-1",
      time: lang === "EN" ? "10m ago" : "منذ ١٠ د",
      source: lang === "EN" ? "Reddit Devkit Leaks" : "تسريبات منصة ريديت",
      title: lang === "EN" 
        ? "PlayStation 6 Architecture suggests dedicated AI Upscaling Hardware chiplet."
        : "بنية بلايستيشن 6 تقترح شريحة عتادية مخصصة لترقية الصورة فائقة الدقة بالذكاء الاصطناعي.",
      originalDraft: "PlayStation 6 spec sheet reveals dedicated PSSR-2 hardware upscaling block, bypasses main vector engine to enforce zero-latency gaming in 8K."
    },
    {
      id: "leak-2",
      time: lang === "EN" ? "42m ago" : "منذ ٤٢ د",
      source: lang === "EN" ? "Taiwan GPU Supply" : "إمدادات معالجات تايوان",
      title: lang === "EN"
        ? "GeForce RTX 5090 Blackwell pricing leaked. Estimated +15% IPC performance."
        : "تسريب أسعار GeForce RTX 5090 Blackwell. زيادة أداء تفاعلية بنسبة ١٥٪.",
      originalDraft: "Exclusive: GeForce RTX 5090 Blackwell wafer yield trends indicate +15% IPC jump and 512-bit bus, expected retail price points out of Taiwan."
    },
    {
      id: "leak-3",
      time: lang === "EN" ? "2h ago" : "منذ ساعتين",
      source: lang === "EN" ? "G4Arab Special Intel" : "استخبارات G4Arab الخاصة",
      title: lang === "EN"
        ? "GTA VI map size comparison with Vice City leaks. 2.1x landscape scale confirmed."
        : "مقارنة حجم خريطة GTA VI بالنسخ الكلاسيكية. تأكيد رقعة لعب أكبر بمعدل ٢.١ ضعف.",
      originalDraft: "Inside Source: Grand Theft Auto VI telemetry points to 2.1x land mass scale compared to classic Vice City, supporting dynamic storms in Riyadh time zones."
    }
  ];

  const newsNexus: NewsNexusItem[] = [
    {
      id: "news-1",
      title: lang === "EN" ? "GTA VI Live Weather Replication: A New Standard" : "محاكاة الطقس المباشر في GTA VI: معيار عالمي جديد",
      excerpt: lang === "EN" 
        ? "Next-gen game architectures leverage global cloud server streams to mimic live storm dynamics directly inside virtual coordinates."
        : "تستخدم بنيات ألعاب الجيل القادم تدفقات السحابة العالمية لمطابقة ديناميكيات العواصف الحية داخل اللعبة مباشرة.",
      timeAgo: lang === "EN" ? "1h ago" : "منذ ساعة",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9h7thuCdZC0tvCR9eA2aix6Rbj_5OVFSClyk3Jz3iwAOuIfQPlBfaiN64AzmpNsAbi5ltzXPdawvTxS5i5QpYIOHJSyb5e2bPeZj5n2DModqk5sQo1sS7JfJMq2qprAUnV-bamIax0JDhODTMcYjsSw-2oEE4rYHQlsW9ea_s_oi2C6cCIUgB4mtZVakYbDyjvqeaJTMVtuE4t877jilKu7Jd1qsqWd_WEs4TEi2S9d9rDxiqaswJAB5K5l8KaLkJk_EFZhtOnItg",
      isHot: true
    },
    {
      id: "news-2",
      title: lang === "EN" ? "E3 Reimagined as Saudi Arabian Digital Summit" : "إعادة تصور معرض E3 كقمة رقمية في المملكة العربية السعودية",
      excerpt: lang === "EN"
        ? "Key publishers align portfolios with Middle East eSports World Cup developments to solidify year-round gaming content cycles."
        : "يقوم كبار الناشرين بتنسيق استثماراتهم مع كأس العالم للرياضات الإلكترونية في الشرق الأوسط لترسيخ دورات المحتوى.",
      timeAgo: lang === "EN" ? "4h ago" : "منذ ٤ ساعات",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAys-SmACq7mf8IreIJmkfRgk8zd5t_r1b_RuONxPMGeoCF7s67Hg-AWs7TUM7KsszIdChX3DbvSJutRLkCckeTaD0mYtonxTl47_fxIJBjL6XyGh_Icux5UG_bM2FlFPSmL_WfB828JYq3OHjtFp359SETujNWoAtVzjhCUnUL7pzckkdA0nKNctlSNfqjSBoGaQVv5W415AKe5Y1oh3KXuvceIX2IJVAwVIUXyvExYuGdWS0T0ZvLue7KDbjKP1CH8LaG2v8g53T"
    },
    {
      id: "news-3",
      title: lang === "EN" ? "Blackwell RTX 50-Series Architectural Silicon Analysis" : "تحليل السيليكون المعماري لسلسلة RTX 50 Blackwell",
      excerpt: lang === "EN"
        ? "Disassembling physical board traces indicates full PCI-Express 5.0 integration alongside GDDR7 direct access rendering pipelines."
        : "يشير تفكيك مسارات اللوحة الفيزيائية إلى تكامل PCI-Express 5.0 الكامل جنبًا إلى جنب مع قنوات تقديم GDDR7 المباشرة.",
      timeAgo: lang === "EN" ? "Yesterday" : "أمس",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo4YtI58Uca9ArrugL0FUatNHSd6UbParjHlSoVNHnFmwUxtqNAvZ2fBa-Pbg0ft8g2EoGFDSjd3rgTAYWguqCLcafA2BsobkXumBloUbrGe7sMWIiMniFdUv9HZMAHBhBCczu0LBxHlxeEmMvC3QeE0Jghw9-YLHYi1Ujp8WSRTjSTW0G2V9y_yYsDbwOot6jAN7NhtzT5CwiMaJG1U6zYo7C8-ctehNyBtWoqtarK0McorQEiubslceSyuGgX02xLktKb6p2tu3A"
    }
  ];

  const handlePushToStudio = (draftText: string) => {
    onSendToStudio(draftText);
    setView("Studio");
  };

  const filteredNews = newsNexus.filter(news =>
    news.title.toLowerCase().includes(searchText.toLowerCase()) ||
    news.excerpt.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-8 select-none relative z-10" dir={lang === "AR" ? "rtl" : "ltr"}>
      
      {/* Upper Meta-Bar Stats Grid (Bento Boxes with Frosted Glass Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outputMetrics.map((met, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-all duration-300 shadow-xl">
            <div className="flex justify-between items-start mb-2.5">
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest leading-none">
                {met.label}
              </span>
              <TrendingUp className={`w-3.5 h-3.5 ${met.color}`} />
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className={`font-sans font-black text-2xl tracking-tight text-white`}>
                {met.value}
              </span>
            </div>

            {/* Custom SVG Line Graphs purely rendered inside */}
            <div className="mt-4 h-5 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path 
                  d={`M0,15 Q25,${20 - met.percent/5} 50,12 T100,${20 - met.percent/4}`} 
                  fill="none" 
                  stroke={met.color.includes("indigo") ? "#818cf8" : (met.color.includes("cyan") ? "#22d3ee" : "#34d399")} 
                  strokeWidth="1.5" 
                />
                <circle cx="100" cy={20 - met.percent/4} r="2" fill="#818cf8" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Active Content Pipeline Columns (8 Columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Section Heading */}
          <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4.5 border border-white/10 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Database className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="font-sans font-extrabold text-white text-sm uppercase tracking-tight">
                  {lang === "EN" ? "ACTIVE CONTENT PIPELINE" : "مسار الهيكلة التحريرية الفورية"}
                </h3>
                <p className="font-sans text-[10px] text-slate-400 mt-0.5">
                  {lang === "EN" 
                    ? "Real-time synchronization from harvesting scrapers to editorial layouts."
                    : "المزامنة الفورية من خوادم وعقد الجلب إلى قوالب التحرير التفاعلية."}
                </p>
              </div>
            </div>
            <span className="font-mono text-[9px] px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/15">
              {lang === "EN" ? "3 ACTIVE CAMPAIGNS" : "٣ حملات نشطة"}
            </span>
          </div>

          {/* Pipeline stages (side-by-side active tasks representation) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                stage: lang === "EN" ? "DRAFTING" : "المسودة الأولى", 
                title: lang === "EN" ? "GTA VI Leak Analysis" : "تحليل تسريب GTA VI", 
                progress: 82, 
                author: "Sarah Jenkins", 
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC619-bVOUeHe8ZuMcCFIz4UHPCz9yGKKSmf74TIYAOOMVVP-hwqCfz2zMB-ygylkr9VLxfl5KMkL_OeXVgXKE5fJ_8kJYGoqvoWQDbKLebKixZFv9NQITnHX4fZ02vKh22Jswcr2Qa7b8-TKbYfb-LAw8vf1HBWIzcNZYSHnrFCisukBV6qcsXGQtW46MUa2_Ch2xYqGKRUCv6J-ZvRnL_YSrnsTpILNT2aenYiF_oOvfb060dEIH6YPTg3M6lLdesZHDEJ5gRfoDv" 
              },
              { 
                stage: lang === "EN" ? "SEO OPTIMIZING" : "محركات البحث SEO", 
                title: "RTX 5090 Blackwell", 
                progress: 45, 
                author: "Kaito Arata", 
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpMt0uXJ1WaLiCotoRWFEjzVnz3UFWDkVBGqgFquALPCYwAj9hXBAjPzoBRbXuaGTCVttnslAlNZzUQn2zinwfLfBT7wz725Blb3qgcV4YtVq51IySCPKrQi32iooIH-iFxmBKrQoTRNO60sIq1hEkheCxY7aaOx_OjnCQFqfpkJd6FDiIgp7X1zXsw5D8Wvvy2JW0CUI3q5qIks7YkoGZBlWML2HQ1w1uaw4aFq2DzMYgJtKG_46bJ4WJv7cqwjMtSDtdOtg10hYr" 
              },
              { 
                stage: lang === "EN" ? "REVIEW & TRANSLATING" : "المراجعة والتصحيح", 
                title: lang === "EN" ? "Saudi eSports Sync" : "مزامنة الرياضات السعودية", 
                progress: 95, 
                author: "Commander_G4", 
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKIxiDCLP2pFz_HL_P0ZXcr3WAGB4oAb6XJOoxxPGFJjTdB53VcvwSdwzy37C7N0SFU0pslq4OU7qAyVOjxxMJFevwrx6-IXVwp9ledh54rTihMtJ1A_vvua_nluaFQSHVbDGUP-oADvEUpgW4J4rlWPXCUjyw7ahYsacmBEIc0o9_TocnuvV6wioKvdu0kl0AtKhjztU-EZPkoCApnyBl5MzIghwhdNszGhaMbkK84Xmm5Lpjk1-yKV5UEhqWYuEV8XQpPpT7tvsY" 
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-3.5 hover:bg-white/10 hover:border-indigo-500/40 transition-all duration-300 shadow-md group">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase">
                    {p.stage}
                  </span>
                  <span className="font-mono text-xs text-indigo-400 font-bold">{p.progress}%</span>
                </div>

                <h4 className="font-sans font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">
                  {p.title}
                </h4>

                <div className="h-1.5 bg-slate-950/45 w-full rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${p.progress}%` }}></div>
                </div>

                <div className="flex items-center gap-2 justify-between pt-1 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img src={p.avatar} alt="" className="w-5 h-5 rounded-full object-cover shrink-0" />
                    <span className="truncate font-sans">{p.author}</span>
                  </div>
                  <button 
                    onClick={() => handlePushToStudio(p.title + " Professional Draft: Ready of Middle East media syndications.")} 
                    className="p-1 px-1.5 bg-slate-950/40 border border-white/10 hover:border-indigo-400 rounded-lg text-indigo-400 hover:text-white transition-all cursor-pointer"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cinematic vice city sunset banner frame */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative group h-[220px] shadow-2xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9h7thuCdZC0tvCR9eA2aix6Rbj_5OVFSClyk3Jz3iwAOuIfQPlBfaiN64AzmpNsAbi5ltzXPdawvTxS5i5QpYIOHJSyb5e2bPeZj5n2DModqk5sQo1sS7JfJMq2qprAUnV-bamIax0JDhODTMcYjsSw-2oEE4rYHQlsW9ea_s_oi2C6cCIUgB4mtZVakYbDyjvqeaJTMVtuE4t877jilKu7Jd1qsqWd_WEs4TEi2S9d9rDxiqaswJAB5K5l8KaLkJk_EFZhtOnItg" 
              alt="Vice City Sunset" 
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-[1.01] transition-all duration-700"
            />
            
            {/* Absolute gradients & titles */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 select-none text-right">
              <span className={`font-mono text-[9px] text-indigo-400 font-extrabold tracking-widest uppercase mb-1 ${lang === "AR" ? "text-right" : "text-left"}`}>
                {lang === "EN" ? "CINEMATIC EXCLUSIVE RE-RENDER" : "إعادة إنتاج وعرض حصري مرئي"}
              </span>
              <h3 className={`font-sans font-black text-xl text-white tracking-tight sm:text-2xl ${lang === "AR" ? "text-right" : "text-left"}`}>
                {lang === "EN" 
                  ? "GTA VI Global Analysis & Live Riyadh Server Sync."
                  : "تحليل GTA VI العالمي ومزامنة سحابة خوادم الرياض الحية."}
              </h3>
              <p className={`font-sans text-xs text-slate-300 mt-1 max-w-xl ${lang === "AR" ? "mr-auto ml-0 text-right" : "mr-0 ml-auto text-left"}`}>
                {lang === "EN" 
                  ? "Leveraging real-time scraper nodes to evaluate peak latency, database size, and audience indexing in Arabic media pipelines."
                  : "توظيف العقد الرقمية المتطورة لقياس مستويات الهدر والكمون، وتصنيف تفاعلات الجمهور العربي."}
              </p>
            </div>
          </div>
        </div>

        {/* Breaking Leaks Feed & Global Trend Heat Monitor (4 Columns stacked bento box) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-mono text-[10px] text-indigo-300 font-bold tracking-widest uppercase flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-indigo-400" />
                {lang === "EN" ? "BREAKING LEAKS" : "التسريبات العاجلة"}
              </h3>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </div>

            {/* Leaks Items List */}
            <div className="space-y-4">
              {breakingLeaks.map((leak) => (
                <div 
                  key={leak.id} 
                  className="bg-white/5 p-3.5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-indigo-400/40 transition-all duration-300 space-y-2 relative group shadow-md"
                >
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="text-cyan-400 tracking-wider uppercase font-extrabold">{leak.source}</span>
                    <span className="text-slate-400">{leak.time}</span>
                  </div>

                  <p className="font-sans text-xs font-bold text-white group-hover:text-indigo-300 transition-colors leading-relaxed">
                    {leak.title}
                  </p>

                  <div className="pt-1.5 flex justify-end gap-2">
                    <button 
                      onClick={() => onAutoDraft && onAutoDraft(leak.originalDraft)}
                      className="px-3 py-1.5 bg-indigo-550 hover:bg-indigo-600 rounded-lg text-[10px] font-mono text-white border border-white/10 shadow-lg shadow-indigo-550/20 cursor-pointer uppercase transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                      {lang === "EN" ? "AI Auto-Draft" : "صياغة فائقة بالذكاء"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GLOBAL PLAYERS HEAT MONITOR - STACKED BENTO BOX */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-mono text-[10.5px] text-cyan-400 font-extrabold tracking-widest uppercase flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                {lang === "EN" ? "GLOBAL PLAYERS HEAT MONITOR" : "مؤشرات رصد الاهتمامات والاشتعال"}
              </h3>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "GTA VI PC Release Metadata Log",
                  titleAR: "كشف ملفات أسلوب لعب GTA VI للكمبيوتر في سجلات المحرك",
                  heatLevel: 9.8,
                  category: "CRITICAL",
                  volume: "+55k/hr query velocity",
                  concept: "Grand Theft Auto VI metadata entries discovered inside latest Rockstar Social Hub updates, validating ongoing PC diagnostic builds with advanced graphics tracing elements."
                },
                {
                  title: "Nintendo Switch 2 Pricing Rumors",
                  titleAR: "تسريبات السعر العالمي لنينتندو سويتش 2 ومواصفات السوكيت",
                  heatLevel: 9.2,
                  category: "HIGH",
                  volume: "28k active search spikes",
                  concept: "Nintendo Switch 2 price verified at $399. Features customized Nvidia T239 custom SOC with full support for hardware DLSS upscaling, target 60FPS gaming output, and 256GB secure storage lanes."
                },
                {
                  title: "RTX 5090 Blackwell Hardware bluechip",
                  titleAR: "تسريب لوحة RTX 5090 Blackwell وتفاصيل التبريد الهوائي الفائق",
                  heatLevel: 8.7,
                  category: "ACTIVE",
                  volume: "14k tweets/hr activity peaks",
                  concept: "Latest specification leak for NVIDIA GeForce RTX 5090 details customized thermal vapor chambers and memory layout out of high-grade Taiwan manufacturer pipelines."
                }
              ].map((trend, i) => (
                <div key={i} className="bg-white/5 p-3.5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 space-y-2 relative group shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[8.5px] text-[#fbbf24] font-black uppercase tracking-wider">{trend.category} INDEX</span>
                    <span className="font-mono text-[9px] text-slate-400">{trend.volume}</span>
                  </div>

                  <h4 className="font-sans text-xs font-extrabold text-white leading-relaxed group-hover:text-cyan-300 transition-colors">
                    {lang === "EN" ? trend.title : trend.titleAR}
                  </h4>

                  {/* Heat scale simulation bar */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 h-1 bg-slate-950/45 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${trend.heatLevel * 10}%` }}></div>
                    </div>
                    <span className="font-mono text-[9px] text-cyan-400 font-bold">{trend.heatLevel}/10</span>
                  </div>

                  <div className="pt-1.5 flex justify-between items-center">
                    <span className="font-mono text-[8px] text-slate-500">INDEXED {i + 1}h AGO</span>
                    <button
                      onClick={() => onAutoDraft && onAutoDraft(trend.concept)}
                      className="px-2.5 py-1.5 bg-cyan-400/10 border border-cyan-400/20 hover:bg-cyan-400 hover:text-slate-950 rounded-lg text-[9px] font-mono text-cyan-400 font-bold cursor-pointer transition-all flex items-center gap-1 uppercase"
                    >
                      <Sparkles className="w-3 h-3 text-inherit animate-pulse" />
                      <span>{lang === "EN" ? "Auto-Draft" : "صياغة فائقة بالذكاء"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* News Nexus Feed Footer Section */}
      <div className="space-y-5">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h3 className="font-sans font-black text-white text-lg uppercase tracking-tight">
            {lang === "EN" ? "NEWS NEXUS (Middle East Media Archive)" : "سجل أخبار الألعاب وشبكة الشرق الأوسط"}
          </h3>
          <span className="font-mono text-[9px] text-slate-400 uppercase">
            {lang === "EN" ? "CHRONOLOGICAL MEDIA STREAM" : "تدفق السير التحريري المتسلسل"}
          </span>
        </div>

        {/* News Nexus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div key={news.id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-indigo-500/40 transition-all duration-300 rounded-2xl overflow-hidden shadow-xl group">
              <div className="h-44 w-full overflow-hidden relative">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Hot Tag badge */}
                {news.isHot && (
                  <span className="absolute top-3 left-3 bg-indigo-500 text-white px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase shadow-md">
                    {lang === "EN" ? "HOT SIGNAL" : "إشارة عاجلة وسريعة"}
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    {news.timeAgo}
                  </span>
                  <span className="tracking-widest uppercase text-emerald-400">SYNDICATE_OK</span>
                </div>

                <h4 className="font-sans font-bold text-sm text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {news.title}
                </h4>

                <p className="font-sans text-[11px] leading-relaxed text-slate-300 truncate-2-lines">
                  {news.excerpt}
                </p>

                <div className="pt-3 border-t border-white/5 flex justify-end">
                  <button 
                    onClick={() => handlePushToStudio(`${news.title}\n\n${news.excerpt}`)}
                    className="text-[10px] font-mono font-bold text-cyan-400 hover:text-indigo-300 flex items-center gap-1 tracking-wider uppercase cursor-pointer"
                  >
                    {lang === "EN" ? "Open in editor" : "تعديل بالاستوديو التحريري"} <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
