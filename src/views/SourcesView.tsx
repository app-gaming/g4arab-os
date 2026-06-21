import React, { useState, useEffect, useRef } from "react";
import { 
  Rss, 
  Globe2, 
  MessagesSquare, 
  Cpu, 
  CheckCircle,
  Zap,
  Activity,
  FileCode,
  Youtube,
  Share2,
  Database as DbIcon,
  AlertTriangle,
  FileCode as WordpressIcon,
  Plus,
  Pencil,
  Trash2,
  Sliders,
  Check,
  X,
  PlaySquare
} from "lucide-react";
import { ConnectedSource, SignalLog } from "../types";

interface SourcesViewProps {
  searchText: string;
  lang: "EN" | "AR";
}

export default function SourcesView({ searchText, lang }: SourcesViewProps) {
  // Connected Sources Data with Localization Support
  const [sources, setSources] = useState<ConnectedSource[]>([
    {
      id: "rss-aggregator",
      name: lang === "EN" ? "Global News Aggregator" : "مجمّع خلاصة الأخبار العالمي",
      type: lang === "EN" ? "RSS Pipeline" : "قنوات تلقيم RSS",
      status: "LIVE",
      iconName: "rss",
      metricLabel: lang === "EN" ? "SYNC INTEGRITY" : "دقة وسلامة المزامنة",
      metricValue: "99.2%",
      integrityPercent: 99.2,
      timeLabel: lang === "EN" ? "Last Update: 2m ago" : "آخر تحديث: قبل دقيقتين",
      configLabel: "CONFIG_SOURCES",
    },
    {
      id: "twitter-pulse",
      name: lang === "EN" ? "Social Pulse Engine" : "محرك النبض الاجتماعي الرياض",
      type: lang === "EN" ? "Social Scraper" : "الزاحف الاجتماعي الفوري",
      status: "SYNCING",
      iconName: "globe",
      metricLabel: lang === "EN" ? "DATA VELOCITY" : "سرعة تدفق البيانات",
      metricValue: "42 KB/s",
      integrityPercent: 45,
      timeLabel: lang === "EN" ? "Items Today: 14.2k" : "المستخرجات اليوم: ١٤.٢ ألف",
      configLabel: "CONFIG_SOURCES",
    },
    {
      id: "discord-comms",
      name: lang === "EN" ? "Private Comms Watch" : "راصد قنوات الاتصال الخاصة",
      type: lang === "EN" ? "API Listener" : "مستمع واجهات API",
      status: "IDLE",
      iconName: "chat",
      metricLabel: lang === "EN" ? "STANDBY MODE" : "حالة الاستعداد والترقب",
      metricValue: lang === "EN" ? "READY" : "جاهز",
      integrityPercent: 10,
      timeLabel: lang === "EN" ? "Scheduled: T+45m" : "مجدول بعد: ٤٥ دقيقة",
      configLabel: "CONFIG_SOURCES",
    },
    {
      id: "silicon-leaks",
      name: lang === "EN" ? "Silicon Leaks DB" : "قاعدة بيانات تسريبات السيليكون",
      type: lang === "EN" ? "JSON Scraper" : "مستخرج بيانات JSON",
      status: "LIVE",
      iconName: "cpu",
      metricLabel: lang === "EN" ? "LAST HIT CONFIDENCE" : "مستوى ثقة التخمين الأخير",
      metricValue: lang === "EN" ? "HIGH (88%)" : "مرتفع (٨٨٪)",
      integrityPercent: 88,
      timeLabel: lang === "EN" ? "New Entry Detected" : "تم رصد مدخل قياسي جديد",
      configLabel: "CONFIG_SOURCES",
    }
  ]);

  // Terminal Logs with localization options
  const [logs, setLogs] = useState<SignalLog[]>(() => [
    { time: "10:42:01", text: lang === "EN" ? "Initializing secure handshake with endpoint://rss.global.net..." : "بدء الاتصال الآمن والمصافحة الرقمية مع الخادم الرئيسي...", color: "white" },
    { time: "10:42:05", text: lang === "EN" ? "WARNING: Packet fragmentation detected in Social Pulse node." : "تحذير: تم رصد تجزؤ في حزم واجهة رصد النبض الاجتماعي.", color: "orange" },
    { time: "10:42:12", text: lang === "EN" ? "> AUTH_KEY verified. Pipe securely established." : "تم التحقق من مفتاح المصادقة واستقرار القناة.", color: "cyan" },
    { time: "10:42:18", text: lang === "EN" ? "SIGNAL DETECTED: { 'origin': 'RTX_5090_FORUMS', 'category': 'LEAK', 'confidence': 0.94 }" : "تم العثور على إشارة نشطة: { المصدر: منتديات RTX 5090، فئة: تسريب، نسبة الثقة: ٠.٩٤ }", color: "cyan" },
    { time: "10:42:25", text: lang === "EN" ? "Distributing packet to processing_cluster_01..." : "توزيع الحزم والبيانات المجمعة على العقد التحريرية الرياض...", color: "white" },
    { time: "10:42:30", text: lang === "EN" ? "ST_SYNC: Global News DB successfully updated (+12 entries)." : "اكتمال المزامنة: تحديث قاعدة أخبار الألعاب بنجاح (+١٢ مدخل).", color: "gray" }
  ]);

  const [inputCommand, setInputCommand] = useState("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Alerts Sliders State
  const [keywordMatching, setKeywordMatching] = useState(85);
  const [anomalyThreshold, setAnomalyThreshold] = useState(50);
  const [notifySpikes, setNotifySpikes] = useState(true);

  // New & Edit Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Form states
  const [formId, setFormId] = useState("");
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("");
  const [formStatus, setFormStatus] = useState<"LIVE" | "SYNCING" | "IDLE">("LIVE");
  const [formIconName, setFormIconName] = useState("rss");
  const [formIntegrity, setFormIntegrity] = useState(90);
  const [formMetricLabel, setFormMetricLabel] = useState("");
  const [formMetricValue, setFormMetricValue] = useState("");

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Autogenerate scrolling logs dynamically
  useEffect(() => {
    const randomLogs = [
      { text: lang === "EN" ? "Heartbeat check: Riyadh cluster-B nodes reporting nominal." : "فحص النبض: العقد في الرياض تعطي قراءة اسمية مستقرة.", color: "gray" },
      { text: lang === "EN" ? "Inbound stream detected from hardware_leaks_v4 stream..." : "تم رصد تدفق بيانات قادم من قناة تسريبات الأجهزة والعتاد...", color: "cyan" },
      { text: lang === "EN" ? "Hashing source fingerprint... OK (SHA-256 match)" : "تشفير بصمة المصدر... ناجح (تطابق SHA-256)", color: "white" },
      { text: lang === "EN" ? "WARNING: High query concurrency on Saudi news scraper index." : "تحذير: معدل استعلامات مرتفع على أرشيف أخبار المملكة.", color: "orange" },
      { text: lang === "EN" ? "SYNC COMPLETE: 4,203 items indexed in global gaming archive." : "تم الدفق والمزامنة: فهرسة ٤,٢٠٣ عنصر في أرشيف الألعاب العالمي.", color: "cyan" }
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const selected = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      
      setLogs(prev => [...prev, {
        time: timeStr,
        text: selected.text,
        color: selected.color as any
      }]);
    }, 8000);

    return () => clearInterval(interval);
  }, [lang]);

  // Handle manual commands
  const handleExecuteCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;

    const cmd = inputCommand.trim();
    const now = new Date().toTimeString().split(" ")[0];

    // Append user input
    setLogs(prev => [...prev, { time: now, text: `> EXECUTE: ${cmd}`, color: "white" }]);

    setTimeout(() => {
      let reply = "";
      let color: "cyan" | "orange" | "white" | "gray" = "cyan";

      if (cmd.toLowerCase() === "help" || cmd === "مساعدة") {
        reply = lang === "EN" 
          ? "Available commands: help | stat | sync-force | clear | route-all" 
          : "الأوامر المتاحة: help | stat | sync-force | clear | route-all";
        color = "white";
      } else if (cmd.toLowerCase() === "stat" || cmd === "حالة") {
        reply = lang === "EN" 
          ? "Core status: STABLE | Scrapers active: 4/4 | Connection integrity: 98.4%" 
          : "حالة النظام: مستقر | المجمعات النشطة: ٤/٤ | سلامة الاتصالات: ٩٨.٤٪";
      } else if (cmd.toLowerCase() === "sync-force" || cmd === "مزامنة") {
        reply = lang === "EN" 
          ? "WARNING: Initiating emergency hard refresh pipeline across Riyadh nodes!" 
          : "تحذير: تم إطلاق مزامنة قهرية عاجلة لعقد وشبكات الرياض الرقمية!";
        color = "orange";
        // Visually pulse sources
        setSources(prev => prev.map(s => ({ ...s, integrityPercent: Math.min(100, s.integrityPercent + 2) })));
      } else if (cmd.toLowerCase() === "clear" || cmd === "مسح") {
        setLogs([]);
        setInputCommand("");
        return;
      } else {
        reply = lang === "EN" 
          ? `Command not recognized: '${cmd}'. Type 'help' for instructions.` 
          : `الأمر غير معروف: '${cmd}'. اكتب 'help' للمساعدة وتعرف الأوامر.`;
        color = "orange";
      }

      setLogs(prev => [...prev, { time: now, text: reply, color }]);
    }, 500);

    setInputCommand("");
  };

  const handleSyncForceButton = () => {
    const now = new Date().toTimeString().split(" ")[0];
    setLogs(prev => [
      ...prev, 
      { 
        time: now, 
        text: lang === "EN" 
          ? ">> EMERGENCY COMMAND: G4_ADMIN INITIATED FORCED RE-SYNC GATEWAY." 
          : ">> أمر طارئ: مدير G4 أطلق بوابة إعادة المزامنة الإجبارية الفورية للشبكة.", 
        color: "orange" 
      }
    ]);
    // Set all syncing
    setSources(prev => prev.map(s => ({ ...s, status: s.status === "IDLE" ? "SYNCING" : s.status })));
  };

  // Open add modal
  const handleOpenAddModal = () => {
    setFormName("");
    setFormType(lang === "EN" ? "API Listener" : "مستمع للواجهات الفورية");
    setFormStatus("LIVE");
    setFormIconName("rss");
    setFormIntegrity(95);
    setFormMetricLabel(lang === "EN" ? "SYNC INTEGRITY" : "دقة وسلامة المزامنة");
    setFormMetricValue("95.0%");
    setShowAddModal(true);
  };

  // Handle Add Form Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newSource: ConnectedSource = {
      id: "source-" + Date.now(),
      name: formName,
      type: formType,
      status: formStatus,
      iconName: formIconName,
      metricLabel: formMetricLabel || (lang === "EN" ? "VELOCITY RATE" : "معدل سرعة التدفق"),
      metricValue: formMetricValue || `${formIntegrity}%`,
      integrityPercent: formIntegrity,
      timeLabel: lang === "EN" ? "Added: Just now" : "تمت الإضافة: الآن",
      configLabel: "CONFIG_SOURCES"
    };

    setSources(prev => [newSource, ...prev]);
    setShowAddModal(false);

    // Append log event
    const now = new Date().toTimeString().split(" ")[0];
    setLogs(prev => [
      ...prev,
      {
        time: now,
        text: lang === "EN" 
          ? `SUCCESS: Formed ingestion pipeline for node [${formName}] with ${formStatus} segment.` 
          : `نجاح: تم ربط وتشكيل قناة تلقيم جديدة للمنصة [${formName}] في قطاع النشاط الإخباري.`,
        color: "cyan"
      }
    ]);
  };

  // Open Edit Modal
  const handleOpenEditModal = (source: ConnectedSource) => {
    setFormId(source.id);
    setFormName(source.name);
    setFormType(source.type);
    setFormStatus(source.status);
    setFormIconName(source.iconName);
    setFormIntegrity(source.integrityPercent);
    setFormMetricLabel(source.metricLabel);
    setFormMetricValue(source.metricValue);
    setShowEditModal(true);
  };

  // Handle Edit Form Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setSources(prev => prev.map(s => {
      if (s.id !== formId) return s;
      return {
        ...s,
        name: formName,
        type: formType,
        status: formStatus,
        iconName: formIconName,
        integrityPercent: formIntegrity,
        metricLabel: formMetricLabel,
        metricValue: formMetricValue || `${formIntegrity}%`,
        timeLabel: lang === "EN" ? "Configured: Just now" : "آخر ضبط وتعديل: الآن"
      };
    }));

    setShowEditModal(false);

    // Append log event
    const now = new Date().toTimeString().split(" ")[0];
    setLogs(prev => [
      ...prev,
      {
        time: now,
        text: lang === "EN" 
          ? `CONFIG OVERRIDE: Modified properties for pipeline [${formName}]. Re-checking handshake.` 
          : `تعديل السيادة: تم إعادة صياغة ميزات وتفضيلات القناة [${formName}] والتحقق الآن.`,
        color: "cyan"
      }
    ]);
  };

  // Handle Delete Connection safely
  const handleDeleteSource = (id: string, name: string) => {
    if (confirm(lang === "EN" ? `Are you sure you want to terminate pipeline: ${name}?` : `هل أنت متأكد من رغبتك بالقطع العاجل لقناة الاتصال: ${name}؟`)) {
      setSources(prev => prev.filter(s => s.id !== id));
      
      const now = new Date().toTimeString().split(" ")[0];
      setLogs(prev => [
        ...prev,
        {
          time: now,
          text: lang === "EN" 
            ? `TERMINATED: Connection pipeline to node [${name}] was cut from memory.` 
            : `قطع كلي: تم إنهاء وفصل مسار التلقيم الفوري [${name}] ومسح المخازن المؤقتة له.`,
          color: "orange"
        }
      ]);
    }
  };

  // Filter sources on search
  const filteredSources = sources.filter(s => 
    s.name.toLowerCase().includes(searchText.toLowerCase()) || 
    s.type.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-8 select-none relative z-10" dir={lang === "AR" ? "rtl" : "ltr"}>
      
      {/* Dashboard Top Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
        <div>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            {lang === "EN" ? "Sources Pipeline" : "قنوات الرصد الفوري والتكامل"}
          </h2>
          <p className="font-mono text-xs text-indigo-300 mt-2 max-w-2xl leading-relaxed">
            {lang === "EN" 
              ? "Unified orchestration for ingestion pipelines. Managing real-time data harvesting across social networks, news aggregates, and custom API endpoints."
              : "نظام تحكّم موحّد لمسارات إدخال البيانات وتتبعها. إدارة وسحب الأخبار واللوجستيات التحريرية الفورية عبر خلاصات الأخبار ونقاط التكامل الذكي."}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleOpenAddModal}
            className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold rounded-xl hover:brightness-110 shadow-lg shadow-indigo-500/20 text-xs flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider"
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            {lang === "EN" ? "New Inbound Source" : "إضافة مصدر جديد"}
          </button>
          
          <button 
            onClick={handleSyncForceButton}
            className="px-4.5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-xs font-mono text-white transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            {lang === "EN" ? "Force Re-Sync" : "مزامنة إجبارية للعقد"}
          </button>
        </div>
      </div>

      {/* Grid Layout Section */}
      <div className="grid grid-cols-12 gap-6 relative z-10">
        
        {/* Connected Sources (8 Columns) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSources.length === 0 ? (
              <div className="col-span-12 py-16 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-indigo-300 animate-pulse" />
                <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  {lang === "EN" ? "No Ingestion Sources Match Searching Parameter" : "لم يتم رصد أي قنوات إدخال مطابقة لبحثك الحالي"}
                </p>
              </div>
            ) : (
              filteredSources.map((source) => {
                return (
                  <div 
                    key={source.id} 
                    className={`bg-white/5 backdrop-blur-md p-5 group hover:bg-white/10 transition-all duration-300 rounded-2xl border border-white/10 relative shadow-xl ${
                      source.status === "LIVE" ? "border-l-4 border-cyan-400" :
                      source.status === "SYNCING" ? "border-l-4 border-indigo-400" : 
                      "border-l-4 border-slate-400"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-slate-950/45 rounded-xl text-indigo-300">
                          {source.iconName === "rss" && <Rss className="w-4 h-4 text-cyan-400" />}
                          {source.iconName === "globe" && <Globe2 className="w-4 h-4 text-indigo-150" />}
                          {source.iconName === "chat" && <MessagesSquare className="w-4 h-4 text-slate-350" />}
                          {source.iconName === "cpu" && <Cpu className="w-4 h-4 text-cyan-300" />}
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                            {source.name}
                          </h4>
                          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                            {lang === "EN" ? "TYPE:" : "النوع:"} {source.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          source.status === "LIVE" ? "bg-cyan-500/10 text-cyan-400" :
                          source.status === "SYNCING" ? "bg-indigo-500/10 text-indigo-300" :
                          "bg-slate-500/10 text-slate-400"
                        }`}>
                          {source.status === "LIVE" && (lang === "EN" ? "LIVE" : "مباشر")}
                          {source.status === "SYNCING" && (lang === "EN" ? "SYNCING" : "مزامنة")}
                          {source.status === "IDLE" && (lang === "EN" ? "IDLE" : "خامل")}
                        </span>
                      </div>
                    </div>

                    {/* Progress / Metric */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-1.5 text-[10px] font-mono">
                        <span className="text-slate-400 uppercase">{source.metricLabel}</span>
                        <span className="text-indigo-300 font-semibold">{source.metricValue}</span>
                      </div>
                      <div className="h-1.5 bg-slate-950/45 w-full rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            source.status === "LIVE" ? "bg-cyan-400" :
                            source.status === "SYNCING" ? "bg-indigo-500 animate-pulse" :
                            "bg-slate-450"
                          }`} 
                          style={{ width: `${source.integrityPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Footer Actions inside Card for fully professional Custom Operations */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-3 border-t border-white/5 mt-2">
                      <span>{source.timeLabel}</span>
                      
                      <div className="flex items-center gap-2.5">
                        {/* Edit Control Button */}
                        <button 
                          onClick={() => handleOpenEditModal(source)}
                          className="px-2 py-1 bg-white/5 border border-white/10 hover:border-indigo-400/40 text-slate-300 hover:text-indigo-300 rounded-lg flex items-center gap-1 transition-all cursor-pointer font-bold text-[9px]"
                          title="Override Specifications"
                        >
                          <Pencil className="w-2.5 h-2.5" />
                          {lang === "EN" ? "EDIT" : "تعديل"}
                        </button>
                        
                        {/* Delete Control Button */}
                        <button 
                          onClick={() => handleDeleteSource(source.id, source.name)}
                          className="px-2 py-1 bg-rose-500/5 border border-rose-500/15 text-rose-400 hover:bg-rose-500/20 hover:text-white rounded-lg flex items-center gap-1 transition-all cursor-pointer font-bold text-[9px]"
                          title="Purge Pipeline connection"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          {lang === "EN" ? "TERMINATE" : "إنهاء القناة"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Integration Hub Card with Frosted Glass styling */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans font-extrabold text-white text-sm tracking-tight uppercase">
                {lang === "EN" ? "Integration Hub" : "منصات ومواقع التكامل البرمجي"}
              </h3>
              <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase">
                EXTERNAL SYNC ENGINE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "WORDPRESS", icon: WordpressIcon, color: "text-indigo-400", hoverBg: "hover:bg-indigo-400/10" },
                { name: "YOUTUBE", icon: Youtube, color: "text-cyan-400", hoverBg: "hover:bg-cyan-400/10" },
                { name: "MASTODON", icon: Share2, color: "text-emerald-400", hoverBg: "hover:bg-emerald-400/10" },
                { name: "NOTION DB", icon: DbIcon, color: "text-indigo-400", hoverBg: "hover:bg-indigo-400/10" }
              ].map((hub, i) => {
                const Icon = hub.icon;
                return (
                  <div 
                    key={i} 
                    onClick={() => alert(lang === "EN" ? `Integration Hub: Synchronizing schema with ${hub.name}...` : `مزامنة الجداول والبيانات بذكاء مع ${hub.name}...`)}
                    className={`flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 hover:border-indigo-400/40 transition-all duration-200 cursor-pointer rounded-2xl shadow-md group ${hub.hoverBg}`}
                  >
                    <Icon className={`w-7 h-7 ${hub.color} group-hover:scale-110 transition-transform`} />
                    <span className="font-mono text-[10px] text-slate-300 tracking-wider">
                      {hub.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real-time Signal Monitor Terminal (4 Columns) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-950/70 border border-white/10 rounded-2xl flex flex-col h-[480px] shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5 select-none">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
              </div>
              <span className="font-mono text-[9px] tracking-wider text-indigo-300 animate-pulse">
                {lang === "EN" ? "SIGNAL_MONITOR_RAW_CYBER" : "شاشة_المراقبة_الحية"}
              </span>
            </div>

            {/* Terminal Log Output List */}
            <div className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto terminal-scroll space-y-2 text-cyan-400 bg-slate-950/60">
              {logs.map((log, idx) => {
                return (
                  <div key={idx} className="flex gap-2 text-left">
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    <span className={
                      log.color === "orange" ? "text-indigo-400" : 
                      log.color === "cyan" ? "text-cyan-400 font-semibold" : 
                      log.color === "gray" ? "text-slate-400" : "text-white"
                    }>
                      {log.text}
                    </span>
                  </div>
                );
              })}
              <div ref={terminalBottomRef}></div>
            </div>

            {/* Terminal Command Input */}
            <form onSubmit={handleExecuteCommand} className="p-2 border-t border-white/10 flex bg-slate-950/80">
              <span className="text-cyan-400 font-mono px-2 select-none">&gt;</span>
              <input 
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                placeholder={lang === "EN" ? "EXECUTE COMMAND (help)..." : "اتخاذ إجراء أو كتابة أمر (help)..."}
                className="flex-1 bg-transparent border-none text-mono text-xs p-0 focus:ring-0 text-white focus:outline-none"
              />
            </form>
          </div>

          {/* Alert Configuration sliders */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl">
            <h3 className="font-mono text-[10px] tracking-wider text-indigo-300 mb-4 uppercase tracking-widest font-bold">
              {lang === "EN" ? "Alert Sensitivity" : "حساسية الإنذارات المبكّرة والفرز"}
            </h3>

            <div className="space-y-4 font-mono text-[10px]">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-400 uppercase">KEYWORD MATCHING</span>
                  <span className="text-indigo-400 font-bold font-extrabold">ULTRA ({keywordMatching}%)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={keywordMatching}
                  onChange={(e) => setKeywordMatching(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-1 bg-slate-950/80 rounded-lg cursor-pointer transition-all" 
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-400 uppercase">ANOMALY THRESHOLD</span>
                  <span className="text-cyan-400 font-bold font-extrabold">NOMINAL ({anomalyThreshold}%)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100"
                  value={anomalyThreshold}
                  onChange={(e) => setAnomalyThreshold(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-slate-950/80 rounded-lg cursor-pointer" 
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={notifySpikes}
                    onChange={(e) => setNotifySpikes(e.target.checked)}
                    className="rounded bg-slate-950 border-white/10 text-indigo-505 focus:ring-indigo-505"
                  />
                  <span className="text-[11px] text-white group-hover:text-indigo-300 transition-colors">
                    {lang === "EN" ? "NOTIFY ON HARDWARE SPIKES" : "إنذار فوري عند قفزات المخدمات"}
                  </span>
                </label>
              </div>

              {notifySpikes && (
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-slate-300 flex gap-2 items-start mt-2">
                  <AlertTriangle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[9px] leading-relaxed">
                    {lang === "EN" 
                      ? "Active monitors will parse hardware spikes. Threshold set to trigger beyond 85m/s concurrency."
                      : "سيعمل الراصد التلقائي لتتبع مستويات القفزات غير الاعتيادية، منبه فوري عند خط التماس ٨٥/م ث."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* -------------------- ADD CONNECTION MODAL -------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-5 text-left" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="font-sans font-extrabold text-indigo-300 text-base">
                {lang === "EN" ? "Create New Ingest Pipeline" : "إنشاء خط تكامل ورصد جديد"}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-mono uppercase tracking-wider block">
                  {lang === "EN" ? "Source Name" : "اسم المصدر أو المنصة"}
                </label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={lang === "EN" ? "e.g., Reddit Gaming Rumors" : "مثال: منتدى تسريبات الألعاب في كورا"} 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Ingestion Protocol" : "بروتوكول جلب البيانات"}
                  </label>
                  <input 
                    type="text" 
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder={lang === "EN" ? "e.g., Socket Stream" : "النوع: مجس ويب سوكيت"} 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Visual Theme Icon" : "أيقونة العرض المرئية"}
                  </label>
                  <select 
                    value={formIconName}
                    onChange={(e) => setFormIconName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:ring-0 focus:outline-none"
                  >
                    <option value="rss">{lang === "EN" ? "RSS Antenna Feed" : "RSS خلاصة هوائية"}</option>
                    <option value="globe">{lang === "EN" ? "Social Web Globe" : "منصات تواصل واجتماع"}</option>
                    <option value="chat">{lang === "EN" ? "Secure Chat Channel" : "قنوات دردشة مغلقة"}</option>
                    <option value="cpu">{lang === "EN" ? "Processing Chipset" : "طاقة معالجة وعقد"}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Status Class" : "الوضعية التشغيلية للحالة"}
                  </label>
                  <select 
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:ring-0 focus:outline-none"
                  >
                    <option value="LIVE">{lang === "EN" ? "LIVE ON-STREAM" : "مباشر ونشط حالياً"}</option>
                    <option value="SYNCING">{lang === "EN" ? "ACTIVE SYNCING" : "مزامنة ونقل مستمر"}</option>
                    <option value="IDLE">{lang === "EN" ? "STANDBY / IDLE" : "خامل / تفقد دوري"}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Initial Integrity" : "نسبة سلامة النقل الإبتدائية"}
                  </label>
                  <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5">
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={formIntegrity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormIntegrity(val);
                        setFormMetricValue(`${val}.0%`);
                      }}
                      className="flex-1 accent-indigo-500 h-1 bg-slate-900 rounded-lg cursor-pointer" 
                    />
                    <span className="font-mono text-indigo-300 font-bold">{formIntegrity}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Metric Name" : "مسمّى مقياس الأداء"}
                  </label>
                  <input 
                    type="text" 
                    value={formMetricLabel}
                    onChange={(e) => setFormMetricLabel(e.target.value)}
                    placeholder={lang === "EN" ? "e.g., PACKET FLUX RATE" : "مقياس المزامنة"} 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Metric Live Value" : "قيمة مقياس الأداء الحالية"}
                  </label>
                  <input 
                    type="text" 
                    value={formMetricValue}
                    onChange={(e) => setFormMetricValue(e.target.value)}
                    placeholder={lang === "EN" ? "e.g., 99.4% or 14 MBs" : "مثال: 99.4% أو 14 ميجا"} 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-white/5">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-400 rounded-xl font-mono uppercase tracking-widest text-[9px] cursor-pointer"
                >
                  {lang === "EN" ? "Cancel" : "إلغاء"}
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold rounded-xl cursor-pointer text-[9px] uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-inherit stroke-[3px]" />
                  {lang === "EN" ? "Establish Pipe" : "تشغيل وبدء الخدمة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- EDIT CONNECTION MODAL -------------------- */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-5 text-left" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="font-sans font-extrabold text-indigo-300 text-base">
                {lang === "EN" ? "Override Pipeline Configurations" : "تجاوز وتعديل إعدادات مسار التدفق"}
              </h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-mono uppercase tracking-wider block">
                  {lang === "EN" ? "Source Name" : "اسم المصدر أو المنصة"}
                </label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Ingestion Protocol" : "بروتوكول جلب البيانات"}
                  </label>
                  <input 
                    type="text" 
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Visual Theme Icon" : "أيقونة العرض المرئية"}
                  </label>
                  <select 
                    value={formIconName}
                    onChange={(e) => setFormIconName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:ring-0 focus:outline-none"
                  >
                    <option value="rss">{lang === "EN" ? "RSS Antenna Feed" : "RSS خلاصة هوائية"}</option>
                    <option value="globe">{lang === "EN" ? "Social Web Globe" : "منصات تواصل واجتماع"}</option>
                    <option value="chat">{lang === "EN" ? "Secure Chat Channel" : "قنوات دردشة مغلقة"}</option>
                    <option value="cpu">{lang === "EN" ? "Processing Chipset" : "طاقة معالجة وعقد"}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Status Class" : "الوضعية التشغيلية للحالة"}
                  </label>
                  <select 
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:ring-0 focus:outline-none"
                  >
                    <option value="LIVE">{lang === "EN" ? "LIVE ON-STREAM" : "مباشر ونشط حالياً"}</option>
                    <option value="SYNCING">{lang === "EN" ? "ACTIVE SYNCING" : "مزامنة ونقل مستمر"}</option>
                    <option value="IDLE">{lang === "EN" ? "STANDBY / IDLE" : "خامل / تفقد دوري"}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Initial Integrity" : "نسبة سلامة النقل الإبتدائية"}
                  </label>
                  <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={formIntegrity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormIntegrity(val);
                        setFormMetricValue(`${val}.0%`);
                      }}
                      className="flex-1 accent-indigo-500 h-1 bg-slate-900 rounded-lg cursor-pointer" 
                    />
                    <span className="font-mono text-indigo-300 font-bold">{formIntegrity}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Metric Name" : "مسمّى مقياس الأداء"}
                  </label>
                  <input 
                    type="text" 
                    value={formMetricLabel}
                    onChange={(e) => setFormMetricLabel(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Metric Live Value" : "قيمة مقياس الأداء الحالية"}
                  </label>
                  <input 
                    type="text" 
                    value={formMetricValue}
                    onChange={(e) => setFormMetricValue(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-white/5">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-400 rounded-xl font-mono uppercase tracking-widest text-[9px] cursor-pointer"
                >
                  {lang === "EN" ? "Cancel" : "إلغاء"}
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold rounded-xl cursor-pointer text-[9px] uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-inherit stroke-[3px]" />
                  {lang === "EN" ? "Save Changes" : "تأكيد واستبدال التكوين"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
