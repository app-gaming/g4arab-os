import React, { useState } from "react";
import { 
  Flame, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  TrendingUp, 
  Gamepad2, 
  Copy, 
  Check, 
  Compass, 
  Heart, 
  Eye, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { ViewType } from "../types";

interface DashboardViewProps {
  lang: "EN" | "AR";
  onSendToStudio: (engText: string, arText: string) => void;
  setView: (view: ViewType) => void;
}

interface NewsItem {
  id: string;
  category: "LEAK" | "TREND" | "RUMOR" | "ANNOUNCEMENT";
  categoryEN: string;
  categoryAR: string;
  source: string;
  time: string;
  titleEN: string;
  titleAR: string;
  summaryEN: string;
  summaryAR: string;
  image: string;
  buzzLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  draftTextEN: string;
  draftTextAR: string;
  viewsCount: number;
}

export default function DashboardView({ lang, onSendToStudio, setView }: DashboardViewProps) {
  const isRtl = lang === "AR";
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "LEAK" | "TREND" | "RUMOR">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Premium hand-curated gaming news and leaks database
  const newsDatabase: NewsItem[] = [
    {
      id: "leak-ps6",
      category: "LEAK",
      categoryEN: "Hardware Leak",
      categoryAR: "تسريبات العتاد",
      source: "Taiwan Assembly Line",
      time: isRtl ? "منذ ١٥ دقيقة" : "15 mins ago",
      titleEN: "PlayStation 6 spec sheet reveals custom AMD SoC with dedicated PSSR-2 upscaler",
      titleAR: "مواصفات بلايستيشن ٦ المسربة: معالج AMD هجين مخصص مع شريحة ترقية PSSR-2",
      summaryEN: "Leaked schemas point to a secondary AI matrix unit dedicated to zero-latency frame generation and 8K supersampling, bypassing general compute queues.",
      summaryAR: "مخططات حصرية تشير إلى إدماج وحدة معالجة مستقلة كلياً للذكاء الاصطناعي لتفادي الكمون وسرعة عرض الإطارات بمستوى دقة خارق 8K دون إرهاق المعالج الرئيسي.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxfIA1Gwjk9DK2RfNPfoFJpKsPrAcqTXfxWA5uNW65zEG1CIfHB9lBl0rAyY9T_04NLosbk1a34LrdCDmP6g3vEiRvKninzoZ5cITFdVp0nTcF1ulHuCHINDm9wU8WIVFSB-4Za7ShNZOsHuMV-s4EkOoBul3gM18zkYu7J20TSwYPwG9rAsaNNFDKB_0G2VQBYiHjGDA2oWDIAvncIh5QvsUOH4aNzlvIgHdPmW9dGVeyfohZ841BrJOQIxSqe8u7sCihzgMFCCcz",
      buzzLevel: "CRITICAL",
      viewsCount: 4830,
      draftTextEN: "PlayStation 6 spec sheet leak: Sony engineers are reportedly developing a dedicated hardware upscaling block (tentatively named PSSR-2) to handle real-time 8K asset projection. This architecture bypasses standard CPU/GPU pipelines to ensure latency remains below 4ms under intensive rendering loads.",
      draftTextAR: "تحديت معارضي حصري: كشفت تقارير هندسية مسرّبة عن مواصفات معمارية الجيل القادم بلايستيشن ٦ (PS6). سوني توصلت لاتفاقية سرية وممتدة مع شركة AMD لتطوير معالج هجين مخصص يتضمن وحدة معالجة عصبية فائقة لحوسبة تقنية PSSR-2 المبتكرة لترقية الصورة بشكل فوري وتفادي الكمون."
    },
    {
      id: "leak-gta6",
      category: "LEAK",
      categoryEN: "Exclusive Discovery",
      categoryAR: "كشف حصري",
      source: "Riyadh QA Servers",
      time: isRtl ? "منذ ساعة" : "1 hour ago",
      titleEN: "GTA VI real-time weather system replicates live regional rain telemetry",
      titleAR: "نظام الطقس المتغير في GTA VI يطابق منسوب الأمطار الحقيقي بالشرق الأوسط",
      summaryEN: "Inside sources confirm Rockstar servers ping regional weather stations to render dynamic atmospheric visual cues directly inside the game's Miami-inspired database.",
      summaryAR: "أكدت مصادر داخلية أن خوادم روكستار ستقوم بسحب معلومات الهيئة العامة للأرصاد بشكل حي لعكس الرطوبة والرياح وسقوط الأمطار داخل عالم العبة بشكل تفاعلي.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9h7thuCdZC0tvCR9eA2aix6Rbj_5OVFSClyk3Jz3iwAOuIfQPlBfaiN64AzmpNsAbi5ltzXPdawvTxS5i5QpYIOHJSyb5e2bPeZj5n2DModqk5sQo1sS7JfJMq2qprAUnV-bamIax0JDhODTMcYjsSw-2oEE4rYHQlsW9ea_s_oi2C6cCIUgB4mtZVakYbDyjvqeaJTMVtuE4t877jilKu7Jd1qsqWd_WEs4TEi2S9d9rDxiqaswJAB5K5l8KaLkJk_EFZhtOnItg",
      buzzLevel: "CRITICAL",
      viewsCount: 9410,
      draftTextEN: "Game-changing tech leak: Grand Theft Auto VI is set to introduce dynamic real-time atmospheric replication. The Rockstar cloud engine pings local coordinates to synchronize rain intensity, tidal swells, and wind speed within Vice City, creating unprecedented organic immersion.",
      draftTextAR: "تسريب تقني ثوري: لعبة GTA VI ستقدم مزامنة فورية غير مسبوقة لحالة الطقس المباشرة. محرك السحابة الخاص بروكستار يتصل بنظام رصد جغرافي حقيقي ليعكس هطول وعنف الأمطار ومستوى الأمواج في فايس سيتي للتطابق مع الطقس الفعلي للاعب."
    },
    {
      id: "trend-re9",
      category: "TREND",
      categoryEN: "Hot Trend",
      categoryAR: "تريند ساخن",
      source: "Insider Gaming",
      time: isRtl ? "منذ ساعتين" : "2 hours ago",
      titleEN: "Resident Evil 9 switches to seamless open-world using RE Engine upgrade",
      titleAR: "ريزدنت إيفل ٩ تتحول إلى عالم مفتوح شاسع ومستمر بمحرك RE المحدث",
      summaryEN: "Capcom is reportedly utilizing engine technology built for Monster Hunter Wilds to construct an immersive, uninterrupted island horror experience.",
      summaryAR: "تقارير تشير إلى استخدام كابكوم لتقنيات العالم المفتوح المطورة مسبقاً للعبة مونستر هانتر وايلدز لبناء جزيرة رعب متكاملة خالية تماماً من شاشات التحميل.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo4YtI58Uca9ArrugL0FUatNHSd6UbParjHlSoVNHnFmwUxtqNAvZ2fBa-Pbg0ft8g2EoGFDSjd3rgTAYWguqCLcafA2BsobkXumBloUbrGe7sMWIiMniFdUv9HZMAHBhBCczu0LBxHlxeEmMvC3QeE0Jghw9-YLHYi1Ujp8WSRTjSTW0G2V9y_yYsDbwOot6jAN7NhtzT5CwiMaJG1U6zYo7C8-ctehNyBtWoqtarK0McorQEiubslceSyuGgX02xLktKb6p2tu3A",
      buzzLevel: "HIGH",
      viewsCount: 3125,
      draftTextEN: "Resident Evil 9 open-world transition: Industry reports state Capcom's upcoming main entry switches to a seamless island landscape. Leveraging tech designed for Monster Hunter Wilds, the RE Engine now supports vast drawing distances with high-fidelity asset rendering.",
      draftTextAR: "تسريبات Resident Evil 9 الساخنة: تقارير تؤكد تبني الجزء الرئيسي القادم لبيئة عالم مفتوح حرة تجري على جزيرة نائية غامضة، مستبدلة التصميم الخطي الكلاسيكي، بالاعتماد على التحديثات المعمارية الأخيرة لمحرك كابكوم المصاحب للعبة Monster Hunter Wilds الجديدة."
    },
    {
      id: "rumor-switch2",
      category: "RUMOR",
      categoryEN: "Rumor / Specs",
      categoryAR: "شائعة / مواصفات",
      source: "Nintendo Developer Network",
      time: isRtl ? "منذ ٤ ساعات" : "4 hours ago",
      titleEN: "Nintendo Switch 2 cartridges to support 128GB flash chips",
      titleAR: "أشرطة نينتندو سويتش ٢ ستدعم أحجام تخزين ضخمة لغاية ١٢٨ جيجابايت",
      summaryEN: "Rumored hardware specs suggest new game cards utilize faster standard NAND blocks to accommodate massive next-gen asset sizes without compression degradation.",
      summaryAR: "تسريبات جديدة تفيد بأن الأشرطة الفيزيائية لمنصة نينتندو القادمة ستنتقل لمستوى تخزيني فلاشي أسرع بكثير لتسع الألعاب عالية الدقة دون الحاجة لضغط زائد لملفات اللعبة.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAys-SmACq7mf8IreIJmkfRgk8zd5t_r1b_RuONxPMGeoCF7s67Hg-AWs7TUM7KsszIdChX3DbvSJutRLkCckeTaD0mYtonxTl47_fxIJBjL6XyGh_Icux5UG_bM2FlFPSmL_WfB828JYq3OHjtFp359SETujNWoAtVzjhCUnUL7pzckkdA0nKNctlSNfqjSBoGaQVv5W415AKe5Y1oh3KXuvceIX2IJVAwVIUXyvExYuGdWS0T0ZvLue7KDbjKP1CH8LaG2v8g53T",
      buzzLevel: "MEDIUM",
      viewsCount: 2240,
      draftTextEN: "Nintendo Switch 2 physical format: Hardware supply analysts confirm next-generation customized flash cartridges will scale up to 128GB capacity. This allows major publishers to distribute uncompressed high-fidelity textures without necessitating large initial digital downloads.",
      draftTextAR: "نينتندو سويتش ٢ وعودة الأشرطة الكبيرة: تشير تقارير سلاسل الإمداد في تايوان أن أشرطة ألعاب سويتش القادم ستتيح سعة تخزينية تبلغ ١٢٨ جيجابايت مع سرعة استجابة فائقة لقراءة الملفات، مما يسهل تشغيل الألعاب الضخمة مباشرة دون الحاجة لتحميل ملفات ثقيلة."
    },
    {
      id: "leak-rtx50",
      category: "LEAK",
      categoryEN: "GPU Architecture",
      categoryAR: "معالجات الرسوميات",
      source: "Taiwan Foundry Board",
      time: isRtl ? "منذ يوم" : "Yesterday",
      titleEN: "Blackwell RTX 5090 Estimated MSRP and layout design leaked",
      titleAR: "تسريب السعر المقترح ومخططات اللوحة لبطاقة RTX 5090 Blackwell المنتظرة",
      summaryEN: "Board disassemblies indicate PCIe 5.0 integration, direct dual-power inputs, and innovative cooling geometries targeting enthusiast platforms.",
      summaryAR: "أكدت تسريبات فنية من مهندسي اللوحات الإلكترونية تزويد فئة 5090 بمنفذ PCIe 5.0 متكامل، مع تقنيات تبريد هجينة ومعدلات طاقة مخصصة للألعاب الثقيلة.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo4YtI58Uca9ArrugL0FUatNHSd6UbParjHlSoVNHnFmwUxtqNAvZ2fBa-Pbg0ft8g2EoGFDSjd3rgTAYWguqCLcafA2BsobkXumBloUbrGe7sMWIiMniFdUv9HZMAHBhBCczu0LBxHlxeEmMvC3QeE0Jghw9-YLHYi1Ujp8WSRTjSTW0G2V9y_yYsDbwOot6jAN7NhtzT5CwiMaJG1U6zYo7C8-ctehNyBtWoqtarK0McorQEiubslceSyuGgX02xLktKb6p2tu3A",
      buzzLevel: "HIGH",
      viewsCount: 5412,
      draftTextEN: "RTX 5090 Blackwell architectural leak: Circuit schematics reveal a massive 512-bit memory interface alongside next-gen GDDR7 memory blocks. Engineering samples point to significantly enhanced thermal dispersion grids and a recommended retail target price.",
      draftTextAR: "تسريب مواصفات بطاقة الوحش المجهول RTX 5090: تم الكشف تسريباً عن ناقل ذاكرة ضخم بسعة 512 بت واستخدام أحدث ذواكر من طراز GDDR7 بالكامل للارتقاء بدقة الألعاب وتتبع الأشعة المعقد."
    }
  ];

  // Hot Games Trend watchlist metrics
  const activeTrends = [
    { title: "Grand Theft Auto VI", arTitle: "قراند ثفت أوتو 6", score: 98, trend: "up", keyWord: "#GTA6" },
    { title: "PlayStation 6", arTitle: "بلايستيشن 6", score: 87, trend: "up", keyWord: "#PS6" },
    { title: "Resident Evil 9", arTitle: "ريزدنت إيفل 9", score: 71, trend: "up", keyWord: "#RE9" },
    { title: "Nintendo Switch 2", arTitle: "سويتش 2", score: 65, trend: "flat", keyWord: "#Switch2" },
    { title: "RTX 5090 Blackwell", arTitle: "باور RTX 5090", score: 54, trend: "down", keyWord: "#RTX5090" }
  ];

  // Quick Action: Send to Studio view to begin localization/writing
  const handlePushToStudio = (item: NewsItem) => {
    onSendToStudio(item.draftTextEN, item.draftTextAR);
    setView("Studio");
    // Pulse highlight state
    setTimeout(() => {
      const el = document.getElementById("studio-draft-box");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Filter & Search Logic
  const filteredTimeline = newsDatabase.filter(item => {
    const matchesFilter = selectedFilter === "ALL" || item.category === selectedFilter;
    const searchString = searchQuery.toLowerCase();
    const matchesSearch = 
      item.titleEN.toLowerCase().includes(searchString) ||
      item.titleAR.includes(searchString) ||
      item.summaryEN.toLowerCase().includes(searchString) ||
      item.summaryAR.includes(searchString) ||
      item.source.toLowerCase().includes(searchString);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in text-slate-100" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* 1. Header with Pulse status (No ugly math metrics!) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-sans rounded-xl font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {isRtl ? "مغذي الأخبار المباشر نشط" : "LIVE GAMING LEAK STREAM ACTIVE"}
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight">
            {isRtl ? "مرصد الأخبار والتسريبات الحية" : "Gaming News & Leaks Hub"}
          </h2>
          <p className="font-sans text-xs text-slate-400 mt-1">
            {isRtl 
              ? "استعرض أحدث الشائعات، تسريبات العتاد، والتريندات الساخنة وقم بتصديرها فوراً لمحرر الكتابة وصياغتها" 
              : "Discover real-time leaks, rumors, and gaming trends. Send any story directly to the Editor Workspace to start drafting."}
          </p>
        </div>

        {/* Categories Pill switches Filter */}
        <div className="flex flex-wrap bg-slate-900 border border-white/5 rounded-xl p-0.5" id="news-category-filters">
          {[
            { key: "ALL", en: "All Stories", ar: "كافة الأخبار" },
            { key: "LEAK", en: "Leaks Only", ar: "التسريبات" },
            { key: "TREND", en: "Trends", ar: "التريندات" },
            { key: "RUMOR", en: "Rumors", ar: "شائعات" }
          ].map((filt) => (
            <button
              key={filt.key}
              onClick={() => setSelectedFilter(filt.key as any)}
              className={`px-3 py-1 text-[10px] sm:text-xs font-sans font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                selectedFilter === filt.key
                  ? "bg-slate-800 text-cyan-400 font-bold border border-white/10 shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {isRtl ? filt.ar : filt.en}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH AND QUICK INSTRUCTION ALERTS BAR */}
      <div className="bg-slate-950/40 border border-white/5 p-3.5 rounded-xl flex flex-col sm:flex-row items-center gap-3.5">
        <div className="w-full relative">
          <input
            type="text"
            placeholder={isRtl ? "ابحث بالعنوان، المصدر، أو الكلمات المفتاحية..." : "Search by title, source, or keywords..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 bg-slate-900 border border-white/10 rounded-xl px-4 text-xs font-sans text-white placeholder-slate-400 outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 text-[11px] font-sans whitespace-nowrap shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>
            {isRtl ? "انقر على «ابدأ الصياغة» لنقل التسريب مباشرة لقسم الكتابة والترجمة" : "Click 'Start Drafting' to prepare any hardware leak for translation instantly"}
          </span>
        </div>
      </div>

      {/* TWO-COLUMN GRID LAYOUT FOR NEWS & LEAKS + RADAR WATCHLIST */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* LEAKS AND NEWS CARDS MAIN LIST (2 Col Span) */}
        <div className="xl:col-span-2 space-y-5">
          {filteredTimeline.length === 0 ? (
            <div className="bg-slate-900/50 border border-white/5 p-12 rounded-2xl text-center select-none">
              <Compass className="w-10 h-10 text-slate-500 mx-auto mb-3.5 animate-spin" />
              <p className="font-sans text-slate-400 text-sm font-bold">
                {isRtl ? "لا توجد أخبار تطابق معايير البحث والفلترة حالياً" : "No gaming leaks match your current search criteria"}
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedFilter("ALL"); }}
                className="mt-3 text-cyan-400 hover:underline font-mono text-xs cursor-pointer"
              >
                {isRtl ? "إعادة الضبط" : "Reset Filters"}
              </button>
            </div>
          ) : (
            filteredTimeline.map((story) => (
              <div 
                key={story.id} 
                className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/20 hover:bg-slate-900/70 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row relative group"
              >
                
                {/* Visual Cover Asset */}
                <div className="w-full md:w-52 h-44 md:h-auto shrink-0 relative overflow-hidden bg-slate-950">
                  <img 
                    src={story.image} 
                    alt={isRtl ? story.titleAR : story.titleEN}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {/* Story Category Capsule Badge */}
                    <span className="px-2.5 py-1 bg-slate-950/90 border border-white/10 rounded-lg text-[9px] font-sans font-bold uppercase tracking-wider text-cyan-400 shadow-md">
                      {isRtl ? story.categoryAR : story.categoryEN}
                    </span>
                  </div>
                </div>

                {/* Body Content Description */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    
                    {/* Meta info bar */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span className="font-mono text-slate-300 font-bold">{story.source}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{story.time}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-slate-500" />
                          <span>{story.viewsCount} {isRtl ? "مشاهدة" : "views"}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title with link hover */}
                    <h3 className="font-sans font-extrabold text-base text-white leading-snug group-hover:text-cyan-300 transition-colors">
                      {isRtl ? story.titleAR : story.titleEN}
                    </h3>

                    {/* Short Summary translation excerpt */}
                    <p className="font-sans text-xs text-slate-300 leading-relaxed">
                      {isRtl ? story.summaryAR : story.summaryEN}
                    </p>

                    {/* Live Keywords / Metrics indicator tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-sans font-bold flex items-center gap-1 ${
                        story.buzzLevel === "CRITICAL"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : story.buzzLevel === "HIGH"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-cyan-500/10 text-cyan-451 border border-cyan-500/20"
                      }`}>
                        <Flame className="w-2.5 h-2.5 text-inherit" />
                        {isRtl ? `درجة الأهمية: ${story.buzzLevel}` : `Buzz: ${story.buzzLevel}`}
                      </span>
                    </div>

                  </div>

                  {/* Actions Row */}
                  <div className="mt-5 pt-3.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(story.id)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          favorites.includes(story.id)
                            ? "bg-rose-500/15 border-rose-500/40 text-rose-400"
                            : "bg-white/5 border-white/5 text-slate-400 hover:text-rose-400 hover:bg-white/10"
                        }`}
                        title={isRtl ? "حفظ كمرجع مفضل" : "Bookmark Story"}
                      >
                        <Heart className="w-4 h-4 text-inherit" />
                      </button>

                      <button
                        onClick={() => handleCopyText(isRtl ? story.summaryAR : story.summaryEN, story.id)}
                        className="p-1.5 bg-white/5 border border-white/5 hover:border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-xs flex items-center gap-1 font-sans"
                        title={isRtl ? "نسخ الملخص السريع" : "Copy Summary Brief"}
                      >
                        {copiedId === story.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] text-emerald-400">{isRtl ? "نسخ!" : "Copied!"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">{isRtl ? "نسخ" : "Copy"}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => handlePushToStudio(story)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-sans font-bold text-xs rounded-xl shadow-lg shadow-indigo-950/50 hover:shadow-indigo-500/10 transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{isRtl ? "ابدأ الصياغة والتحرير" : "Create Editor Draft"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>

              </div>
            ))
          )}
        </div>

        {/* TRENDING RADAR SIDEBAR (Contains live community interest levels) */}
        <div className="space-y-6">
          
          {/* Section 1: Live Keywords Community Monitor */}
          <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <h3 className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  {isRtl ? "مؤشر الاهتمام والتريندات" : "Trending Radar"}
                </h3>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase font-bold">
                {isRtl ? "محدث الآن" : "UPDATED LIVE"}
              </span>
            </div>

            <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
              {isRtl 
                ? "معدلات اهتمام ومشاركة الجمهور العربي لأكثر المواضيع والأسماء تداولاً على منصات التواصل (تويتر وريديت)" 
                : "Real-time attention graphs and mentions representing Middle East gamer search frequencies across social clusters."}
            </p>

            <div className="space-y-3.5pt-1">
              {activeTrends.map((trOption, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-slate-500 font-bold text-[10px] w-4">#{index + 1}</span>
                      <span className="text-white font-bold">{isRtl ? trOption.arTitle : trOption.title}</span>
                      <span className="text-cyan-400 font-mono text-[9px]">{trOption.keyWord}</span>
                    </div>
                    <span className="font-mono text-slate-300 font-bold">{trOption.score}%</span>
                  </div>
                  
                  {/* Visual Premium bar with custom levels */}
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        index === 0 
                          ? "bg-gradient-to-r from-red-500 to-amber-400" 
                          : index === 1
                            ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400"
                            : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                      }`}
                      style={{ width: `${trOption.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1.5">
              <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{isRtl ? "نصيحة تحريرية مجدية" : "RECOMMENDED HEADLINES FOCUS"}</p>
              <p className="font-sans text-xs text-yellow-300/95 leading-normal">
                {isRtl 
                  ? "🔥 هاشتاغ #تسريبات_PS6 يرتفع في السعودية بنسبة ٣٤٪ بعد كشف تفاصيل معالج AMD لترقية الصورة. اهتم بصياغة عناوين تبرز دقة 8K." 
                  : "🔥 Hardware specs for the PlayStation 6 upscaling core have spiked search keywords by +34% in Riyadh. Structure your headlines to highlight 8K capabilities."}
              </p>
            </div>
          </div>

          {/* Section 2: Quick Writing Guide Box */}
          <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden group select-text">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors" />
            
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
              <Gamepad2 className="w-4.5 h-4.5 text-indigo-400" />
              <h4 className="font-sans font-bold text-xs text-indigo-300 uppercase">
                {isRtl ? "مساعدة الناشرين العرب" : "G4Arab Publishing Ethos"}
              </h4>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 leading-normal font-sans">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold shrink-0">✦</span>
                <span>
                  {isRtl 
                    ? "اختر طابعاً تفاعلياً ومثيراً (مثل التون الحماسي) لعرض أخبار العتاد والقطع المشفّرة." 
                    : "Emphasize high-payload hardware statistics like teraflops, memory bandwidth, and upscaler versions using direct values."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold shrink-0">✦</span>
                <span>
                  {isRtl 
                    ? "استخدم الكلمات المفتاحية الأكثر تداولاً في لوحة التحكم لمطابقة خوارزميات محركات البحث (SEO)." 
                    : "Maintain dual-language terms properly (e.g. PlayStation 6, RTX 5090) so both English and Arabic readers can search seamlessly."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold shrink-0">✦</span>
                <span>
                  {isRtl 
                    ? "قم بإعداد مسودة جديدة وافتحها بضغطة زر واحدة لتلقين مساعد الذكاء الاصطناعي وبدء الترجمة." 
                    : "Zero telemetry noise: Focus strictly on localized reader attention rather than complex server configurations."}
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
