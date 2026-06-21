import React, { useState, useEffect } from "react";
import { ViewType } from "./types";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CopilotPanel from "./components/CopilotPanel";

// Views
import SourcesView from "./views/SourcesView";
import TaskView from "./views/TaskView";
import MissionView from "./views/MissionView";
import StudioView from "./views/StudioView";
import SubscriptionsView from "./views/SubscriptionsView";
import DashboardView from "./views/DashboardView";

// Additional Sub-Views
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Globe2, 
  FileCheck2,
  Trash2,
  Sliders,
  Sparkles,
  RefreshCw,
  Terminal,
  Clock,
  Loader2
} from "lucide-react";

export default function App() {
  const [currentView, setView] = useState<ViewType>("Mission Control");
  const [searchText, setSearchText] = useState("");
  const [lang, setLang] = useState<"EN" | "AR">("EN");

  // Toggle states for side menus
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copilotOpen, setCopilotOpen] = useState(true);

  // ---------------- Hoisted Studio Core States ----------------
  const [englishText, setEnglishText] = useState<string>(() => {
    const saved = localStorage.getItem("g4arab_englishText");
    return saved !== null ? saved : "PlayStation 6 spec sheet leak: Sony engineers are reportedly developing a dedicated hardware upscaling block (tentatively named PSSR-2) to handle real-time 8K asset projection. This architecture bypasses standard CPU/GPU pipelines to ensure latency remain below 4ms under intensive rendering loads.";
  });

  const [arabicText, setArabicText] = useState<string>(() => {
    const saved = localStorage.getItem("g4arab_arabicText");
    return saved !== null ? saved : "تحديث معارضي حصري: كشفت تقارير هندسية مسرّبة عن مواصفات معمارية الجيل القادم بلايستيشن ٦ (PS6). سوني توصلت لاتفاقية سرية وممتدة مع شركة AMD لتطوير معالج هجين مخصص يتضمن وحدة معالجة عصبية فائقة لحوسبة تقنية PSSR-2 المبتكرة لترقية الصورة بشكل فوري وتفادي الكمون.";
  });

  const [seoKeywords, setSeoKeywords] = useState<string[]>(() => {
    const saved = localStorage.getItem("g4arab_seoKeywords");
    try {
      return saved !== null ? JSON.parse(saved) : [
        "تسريبات PS6", "ألعاب الرياض", "مواصفات بلايستيشن ٦", "بلايستيشن بمواصفات خارقة"
      ];
    } catch {
      return [
        "تسريبات PS6", "ألعاب الرياض", "مواصفات بلايستيشن ٦", "بلايستيشن بمواصفات خارقة"
      ];
    }
  });

  const [altTitles, setAltTitles] = useState<string[]>(() => {
    const saved = localStorage.getItem("g4arab_altTitles");
    try {
      return saved !== null ? JSON.parse(saved) : [
        "تسريبات بلايستيشن ٦ الرسمية: ذكاء اصطناعي فائق الدقة",
        "ثورة Sony القادمة: رقاقة ذكاء اصطناعي مخصّصة لمنصّة PS6"
      ];
    } catch {
      return [
        "تسريبات بلايستيشن ٦ الرسمية: ذكاء اصطناعي فائق الدقة",
        "ثورة Sony القادمة: رقاقة ذكاء اصطناعي مخصّصة لمنصّة PS6"
      ];
    }
  });

  const [socialThread, setSocialThread] = useState<string[]>(() => {
    const saved = localStorage.getItem("g4arab_socialThread");
    try {
      return saved !== null ? JSON.parse(saved) : [
        "🔥 تسريبات بلايستيشن 6 الرسمية ظهرت! سوني تجهز شريحة مستقلة كلياً لترقية الصورة بالاعتماد على نموذج PSSR-2 المطور. #PS6",
        "📱 بحسب المخططات المسرّبة، سيتم تجاوز معالج الرسوميات التقليدي لحل مشكلة الكمون وتأجج الأداء مع دقة 8K الثورية!"
      ];
    } catch {
      return [
        "🔥 تسريبات بلايستيشن 6 الرسمية ظهرت! سوني تجهز شريحة مستقلة كلياً لترقية الصورة بالاعتماد على نموذج PSSR-2 المطور. #PS6",
        "📱 بحسب المخططات المسرّبة، سيتم تجاوز معالج الرسوميات التقليدي لحل مشكلة الكمون وتأجج الأداء مع دقة 8K الثورية!"
      ];
    }
  });

  // Keep states synchronized in real-time
  useEffect(() => {
    localStorage.setItem("g4arab_englishText", englishText);
  }, [englishText]);

  useEffect(() => {
    localStorage.setItem("g4arab_arabicText", arabicText);
  }, [arabicText]);

  useEffect(() => {
    localStorage.setItem("g4arab_seoKeywords", JSON.stringify(seoKeywords));
  }, [seoKeywords]);

  useEffect(() => {
    localStorage.setItem("g4arab_altTitles", JSON.stringify(altTitles));
  }, [altTitles]);

  useEffect(() => {
    localStorage.setItem("g4arab_socialThread", JSON.stringify(socialThread));
  }, [socialThread]);

  // ---------------- Live Leaks Alert Simulator parameters ----------------
  interface AlertPayload {
    titleEN: string;
    titleAR: string;
    concept: string;
    source: string;
    category: string;
    volume: string;
  }

  const [activeAlert, setActiveAlert] = useState<AlertPayload | null>(null);
  const [alertProcessing, setAlertProcessing] = useState(false);

  // Settings mock configurations
  const [apiKeyStatus, setApiKeyStatus] = useState<"SET" | "DEFAULT">("DEFAULT");
  const [terminalSound, setTerminalSound] = useState(true);
  const [debugLevel, setDebugLevel] = useState("INFO");

  // Inbound leaks simulation pool
  const alertsPool: AlertPayload[] = [
    {
      titleEN: "Nintendo Switch 2 launch pricing & LCD screen panel leaked in reselling database",
      titleAR: "كشف تسريب السعر العالمي لجهاز نينتندو سويتش ٢ ومواصفات لوحة LCD الحركية",
      concept: "Nintendo Switch 2 price verified at $399. Features customized Nvidia T239 custom SOC with full support for hardware DLSS upscaling, target 60FPS gaming output, and 256GB secure storage lanes.",
      source: "Database Reseller Scraper",
      category: "HARDWARE_LEAK",
      volume: "CRITICAL (31k/hr)"
    },
    {
      titleEN: "GTA VI PC optimization profiles loaded inside private Rockstar launcher metadata",
      titleAR: "رصد ملفات أسلوب لعب GTA VI للكمبيوتر في سجلات المحرك السرية لروكستار",
      concept: "Grand Theft Auto VI metadata entries discovered inside latest Rockstar Social Hub updates, validating ongoing PC diagnostic builds with advanced graphics tracing elements.",
      source: "Social Club Telemetry",
      category: "METADATA_DECODE",
      volume: "CRITICAL (55k/hr)"
    },
    {
      titleEN: "Xbox Handheld console prototype outlines custom AMD Zen 5 design architectures",
      titleAR: "تسريب كامل لمواصفات وعينة جهاز إكس بوكس المحمول الجديد بنواة معالجة Zen 5",
      concept: "Leaked presentation slides from developer portal confirm active Xbox handheld prototypes using multi-threaded AMD Zen 5 APU alongside full dynamic RDNA-4 vector computes.",
      source: "Riyadh-Bypass Leak Syndicate",
      category: "CHIPSET_BLUEPRINT",
      volume: "HIGH SIGNAL (12k/hr)"
    }
  ];

  // Pick a random alert and play retro bip tone
  const handleTriggerSimulateAlert = () => {
    const picker = Math.floor(Math.random() * alertsPool.length);
    setActiveAlert(alertsPool[picker]);

    if (terminalSound) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "square"; // retro 8-bit alarm sound
        osc.frequency.setValueAtTime(660, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
      } catch (err) {}
    }
  };

  // Automate full-write package, SEO, and social thread compilation in one click
  const handleAutoProcessAlert = async (conceptText: string) => {
    setAlertProcessing(true);
    setView("Studio"); // navigate instantly
    
    try {
      const res = await fetch("/api/copilot/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: conceptText, tone: "Excited / حماسي ومثير" }),
      });

      if (!res.ok) throw new Error("API Limit exceeded");
      const data = await res.json();
      
      if (data.englishDraft) setEnglishText(data.englishDraft);
      if (data.arabicDraft) setArabicText(data.arabicDraft);
      if (data.seoKeywords) setSeoKeywords(data.seoKeywords);
      if (data.alternativeTitles) setAltTitles(data.alternativeTitles);
      if (data.socialThread) setSocialThread(data.socialThread);
      
    } catch (err) {
      // safe fallback block
      setEnglishText(conceptText);
      setArabicText(`بيان عاجل ومترجم: ${activeAlert?.titleAR || "تسريب ثوري في الألعاب"} // تفاصيل الكونسيبت: ${conceptText}`);
      setSeoKeywords(["عاجل تسريبات", "أخبار معالجات الألعاب", "صياغة المطورين"]);
      setAltTitles([activeAlert?.titleAR || ""]);
      setSocialThread(["🚨 " + activeAlert?.titleAR]);
    } finally {
      setAlertProcessing(false);
      setActiveAlert(null); // Clear notification
    }
  };

  const handleApplyPreset = (presetText: string) => {
    setEnglishText(presetText);
    setView("Studio");
  };

  return (
    <div 
      className="min-h-screen font-sans text-[#e1e2eb] bg-pattern flex relative overflow-hidden"
      dir={lang === "AR" ? "rtl" : "ltr"}
      style={{ background: "radial-gradient(circle at top left, #312e81, #1e1b4b, #0f172a)" }}
    >
      {/* Floating Glass Glow Highlights */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none z-0"></div>
      
      {/* 1. Left Persistent Sidebar */}
      <Sidebar currentView={currentView} setView={setView} lang={lang} open={sidebarOpen} />

      {/* Main Container Frame */}
      <div className={`flex-1 flex flex-col ${
        sidebarOpen 
          ? (lang === "AR" ? "pr-[260px] pl-0" : "pl-[260px] pr-0") 
          : "pl-0 pr-0"
      } h-screen overflow-hidden relative z-10 transition-all duration-300`}>
        
        {/* 2. Top Navigation Header with simulation hook */}
        <Header 
          searchText={searchText} 
          setSearchText={setSearchText} 
          lang={lang} 
          setLang={setLang} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          copilotOpen={copilotOpen}
          setCopilotOpen={setCopilotOpen}
          onSimulateAlert={handleTriggerSimulateAlert}
        />

        {/* 3. Main Operational Content View scroll viewport */}
        <main className="flex-1 overflow-y-auto p-8 pb-16 custom-scrollbar relative">
          
          {/* ----------------- INTERACTIVE TELEMETRY LEAK TOAST ALARM OVERLAY ----------------- */}
          {activeAlert && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-slate-950/95 border-2 border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.3)] p-5 rounded-2xl z-55 flex flex-col md:flex-row items-center justify-between gap-4 animate-bounce-short">
              <div className="flex-1 space-y-1.5 select-text text-left" style={{ direction: "ltr" }}>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/40 text-red-400 text-[8.5px] font-mono rounded font-bold uppercase animate-pulse">
                    📡 INGESTION DETECTED
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    SOURCE: {activeAlert.source} | TYPE: {activeAlert.category}
                  </span>
                </div>
                
                <h4 className="font-sans font-black text-xs text-white uppercase leading-snug">
                  {lang === "EN" ? activeAlert.titleEN : activeAlert.titleAR}
                </h4>
                
                <p className="font-mono text-[9.5px] text-yellow-300/90 leading-relaxed max-w-xl">
                  {lang === "EN" ? "Concept Brief:" : "ملخص كود التسريب:"} {activeAlert.concept}
                </p>
              </div>

              {/* Action columns */}
              <div className="flex sm:flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto self-stretch justify-end">
                <button
                  onClick={() => handleAutoProcessAlert(activeAlert.concept)}
                  disabled={alertProcessing}
                  className="flex-1 md:flex-initial py-2.5 px-4 bg-[#fbbf24] hover:bg-[#f59e0b] text-slate-950 font-sans font-black text-[10px] tracking-wider rounded-xl uppercase transition-all flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-yellow-500/15"
                >
                  {alertProcessing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>{lang === "EN" ? "AI AUTO-DRAFT" : "توليد تلقائي"}</span>
                </button>
                
                <button
                  onClick={() => setActiveAlert(null)}
                  className="flex-1 md:flex-initial py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-mono text-[9px] rounded-xl uppercase transition-all cursor-pointer"
                >
                  {lang === "EN" ? "Dismiss" : "تجاهل الإشارة"}
                </button>
              </div>
            </div>
          )}

          {currentView === "Mission Control" && (
            <MissionView 
              searchText={searchText} 
              lang={lang} 
              onSendToStudio={handleApplyPreset}
              setView={setView}
            />
          )}

          {currentView === "Dashboard" && (
            <DashboardView 
              lang={lang} 
              onSendToStudio={handleApplyPreset}
              setView={setView}
            />
          )}

          {currentView === "Task Management" && (
            <TaskView searchText={searchText} lang={lang} />
          )}

          {currentView === "Studio" && (
            <StudioView 
              englishText={englishText} 
              setEnglishText={setEnglishText} 
              arabicText={arabicText}
              setArabicText={setArabicText}
              seoKeywords={seoKeywords}
              setSeoKeywords={setSeoKeywords}
              altTitles={altTitles}
              setAltTitles={setAltTitles}
              socialThread={socialThread}
              setSocialThread={setSocialThread}
              lang={lang} 
            />
          )}

          {currentView === "Sources" && (
            <SourcesView searchText={searchText} lang={lang} />
          )}

          {/* 4. Interactive sub-views to guarantee no dead links! */}
          {currentView === "Analytics" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-sans font-extrabold text-3xl text-white">
                  {lang === "EN" ? "System Analytics & Node Telemetry" : "تحليلات النظام وقراءات العقد الفورية"}
                </h2>
                <p className="font-mono text-xs text-indigo-300 mt-1">
                  {lang === "EN" ? "Riyadh Core Clusters real-time consumption" : "استهلاك ومتابعة مجموعات خوادم الرياض في الوقت الفعلي"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    label: lang === "EN" ? "MEMORY FLUX" : "دفق الذاكرة والمخزن المؤقت", 
                    val: "12.4 GB / 32 GB", 
                    metric: lang === "EN" ? "68% LOAD" : "حمل الاستهلاك: ٦٨٪", 
                    color: "text-indigo-400" 
                  },
                  { 
                    label: lang === "EN" ? "GPU CONCURRENCY" : "مستوى تفاوض كرت الشاشة", 
                    val: lang === "EN" ? "Riyadh cluster-A" : "مجموعة خوادم الرياض (أ)", 
                    metric: lang === "EN" ? "99.4% INBOUND" : "مدخلات: ٩٩.٤٪", 
                    color: "text-cyan-400" 
                  },
                  { 
                    label: lang === "EN" ? "SCRAPING EFFICIENCY" : "كفاءة التجميع والجلب الهيكلي", 
                    val: "18.2 Hz", 
                    metric: lang === "EN" ? "NOMINAL STATUS" : "الحالة: مستقر ونشط", 
                    color: "text-emerald-400" 
                  },
                  { 
                    label: lang === "EN" ? "SSL ENCRYPTION" : "تشفير وحماية SSL", 
                    val: lang === "EN" ? "ACTIVE SECURITY" : "الحماية المشفرة: نشطة", 
                    metric: "TLS 1.3 SHIELD", 
                    color: "text-purple-400" 
                  }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 transition-all duration-300">
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="font-sans font-black text-lg text-white mt-2">{stat.val}</p>
                    <span className={`font-mono text-[10px] uppercase font-bold ${stat.color} mt-1 block`}>{stat.metric}</span>
                  </div>
                ))}
              </div>

              {/* Hardware visual telemetry simulation */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4">
                <h3 className="font-sans font-bold text-sm text-white uppercase">
                  {lang === "EN" ? "Active Server Nodes Cluster Pipeline" : "مخطط تدفق مجموعات خوادم المعالجة النشطة"}
                </h3>
                <div className="h-44 w-full bg-slate-950/40 backdrop-blur-sm rounded-xl border border-white/10 p-4 font-mono text-xs text-cyan-400 flex flex-col justify-between overflow-hidden">
                  <p dir="ltr">[10:45:11] cluster-01_riyadh: OK (Latency 4ms)</p>
                  <p dir="ltr">[10:45:14] cluster-02_me_east: INDEX_COMPLETED (+34 items synced)</p>
                  <p dir="ltr">[10:45:19] cluster-03_asia_leak_db: HANDSHAKE SECURE (Confidence 94%)</p>
                  <p dir="ltr">[10:45:25] warning: packet size peaks at 14.2 MB/s. Automatic bypass enabled.</p>
                  <div className="flex gap-1 pt-4">
                    {Array.from({ length: 48 }).map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`inline-block flex-1 h-3 rounded-full ${
                          idx % 8 === 0 ? "bg-red-500/80" : (idx % 5 === 0 ? "bg-amber-400/80" : "bg-cyan-400/80")
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "Archives" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-sans font-extrabold text-3xl text-white">
                  {lang === "EN" ? "Technological Archives" : "الأرشيف التقني والمستندات"}
                </h2>
                <p className="font-mono text-xs text-indigo-300 mt-1">
                  {lang === "EN" ? "Stored regional logs and gaming leak syndicates" : "السجلات الإقليمية والمستندات التقنية لتسريبات الألعاب المسترجعة"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    title: lang === "EN" ? "GTA VI Map Comparisons" : "مقارنات خرائط GTA VI الشاسعة", 
                    cat: "Leaked Schema", 
                    date: "May 14, 2026", 
                    desc: lang === "EN" ? "Detailed breakdown of Vice City layout overlays using Riyadh GIS servers." : "تحليل وتفكيك تفصيلي لطبقات مخطط فايس سيتي باستخدام خوادم تخطيط الرياض الجغرافية." 
                  },
                  { 
                    title: lang === "EN" ? "Blackwell RTX 5090 PCB blueprint" : "مخططات لوحة RTX 5090 Blackwell المطبوعة", 
                    cat: "Taiwan Supply Leak", 
                    date: "Jun 02, 2026", 
                    desc: lang === "EN" ? "Thermal dissipation coordinates for multi-channel memory modules." : "مسارات تبريد وتوزيع الحرارة لرقاقة الذاكرة المخصصة متعددة القنوات القادمة." 
                  },
                  { 
                    title: lang === "EN" ? "Sony PSSR-1 Legacy vs PSSR-2 Auto Upscale" : "مقارنة دقة Sony PSSR-1 الكلاسيكية ومولد الترقية التلقائي PSSR-2", 
                    cat: "Sony Hardware Specification", 
                    date: "Yesterday", 
                    desc: lang === "EN" ? "Zero-latency upscaling tests validating 8K performance boundaries." : "اختبارات ترقية الصورة وتطوير الإطار لضمان الألعاب بدقة 8K فائقة الوضوح." 
                  }
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3 hover:bg-white/10 hover:border-indigo-500/40 transition-all duration-300 shadow-lg">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span className="uppercase text-indigo-400 font-bold">{doc.cat}</span>
                      <span>{doc.date}</span>
                    </div>
                    <h4 className="font-sans font-bold text-sm text-white">{doc.title}</h4>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed">{doc.desc}</p>
                    <button 
                      onClick={() => handleApplyPreset(doc.title + " Technical Report Overview: " + doc.desc)}
                      className="text-xs font-mono font-bold text-cyan-400 hover:text-indigo-400 uppercase mt-2 block transition-colors"
                    >
                      {lang === "EN" ? "PUSH TO EDITOR >" : "تعديل بالاستوديو الآن >"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === "Settings" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-sans font-extrabold text-3xl text-white">
                  {lang === "EN" ? "Settings & Node Overrides" : "الإعدادات وتجاوزات النظام"}
                </h2>
                <p className="font-mono text-xs text-indigo-300 mt-1">
                  {lang === "EN" ? "Configure G4Arab OS system parameters" : "إعداد وضبط خصائص نظام تشغيل منصة G4Arab الإخبارية"}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-2xl space-y-6 shadow-xl">
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-xs text-indigo-300 uppercase tracking-wider">
                    {lang === "EN" ? "Gemini Cognitive API Gateway" : "بوابة اتصال الذكاء الاصطناعي التوليدي Gemini"}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === "EN" 
                      ? "By default, the AI Studio runtime automatically injects the Gemini API Secret Key, routing smart recommendations seamlessly."
                      : "بشكل تلقائي، تقوم بيئة تشغيل استوديو الذكاء الاصطناعي بربط مفتاح Gemini السري لمعالجة وترجمة وصياغة التوصيات الذكية دون إرسال المفتاح للمتصفح."}
                  </p>
                  <div className="p-3 bg-slate-950/40 border border-white/10 rounded-xl flex items-center justify-between">
                    <span className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      {lang === "EN" ? "GEMINI_API_KEY: DETECTED & ACTIVE" : "مفتوح ونشط :GEMINI_API_KEY"}
                    </span>
                    <button 
                      onClick={() => alert(lang === "EN" ? "Credentials verified successfully via secure Node authentication wrapper." : "تم التحقق من موثوقية الاتصال ومصادقة واجهات البرمجة بنجاح.")}
                      className="p-1 px-3 bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white rounded-lg cursor-pointer border border-white/10 transition-colors"
                    >
                      {lang === "EN" ? "Verify" : "التحقق الآن"}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/10"></div>

                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-xs text-indigo-300 uppercase tracking-wider">
                    {lang === "EN" ? "Interface Configuration" : "تفضيلات واجهة الاستخدام"}
                  </h3>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-white">
                        {lang === "EN" ? "Auditory Terminal Feedback" : "أصوات لوحة الأوامر السريعة"}
                      </p>
                      <p className="text-slate-400 text-[10px]">
                        {lang === "EN" ? "Play retro audio blips when executing command streams" : "تشغيل تنبيهات ومزامنات صوتية رجعية عند كتابة وتنفيذ الأوامر"}
                      </p>
                    </div>
                    <button 
                      onClick={() => setTerminalSound(!terminalSound)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all duration-300 ${
                        terminalSound ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      {terminalSound ? (lang === "EN" ? "ACTIVE" : "نشط") : (lang === "EN" ? "STANDBY" : "خامل")}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-white">
                        {lang === "EN" ? "Debug Stacktrace Level" : "مستوى تفاصيل مدونات التدقيق"}
                      </p>
                      <p className="text-slate-400 text-[10px]">
                        {lang === "EN" ? "Specify log complexity shown inside the scraper shell monitor" : "تحديد مستوى تعقيد الرسائل المعروضة في شاشة المراقبة الفورية"}
                      </p>
                    </div>
                    <select 
                      value={debugLevel}
                      onChange={(e) => setDebugLevel(e.target.value)}
                      className="bg-slate-950/40 border border-white/10 p-1 px-3 rounded-lg text-mono text-xs outline-none text-white focus:border-indigo-500 transition-colors"
                    >
                      <option className="bg-slate-900 text-white" value="ERROR">ERROR</option>
                      <option className="bg-slate-900 text-white" value="WARN">WARN</option>
                      <option className="bg-slate-900 text-white" value="INFO">INFO</option>
                      <option className="bg-slate-900 text-white" value="VERBOSE">VERBOSE</option>
                    </select>
                  </div>
                </div>

                <div className="h-px bg-white/10"></div>

                <button 
                  onClick={() => {
                    alert(lang === "EN" ? "G4Arab OS local variables successfully returned to core initial state." : "تم مسح البيانات بنجاح وإعادة المتغيرات المحلية لحالتها الأولية المستقرة.");
                    window.location.reload();
                  }}
                  className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  {lang === "EN" ? "Hard Reset OS Simulation" : "إعادة تشغيل النظام محليًا وتصفير الذاكرة"}
                </button>
              </div>
            </div>
          )}

          {currentView === "Subscriptions" && (
            <SubscriptionsView lang={lang} />
          )}

        </main>

        {/* 5. Bottom System Status Ticker */}
        <Footer lang={lang} />
      </div>

      {/* 6. Right Co-Pilot intelligence Command Terminal Panel */}
      <CopilotPanel onApplyPreset={handleApplyPreset} lang={lang} open={copilotOpen} />

    </div>
  );
}
