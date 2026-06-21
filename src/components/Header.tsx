import React, { useState, useEffect } from "react";
import { Search, Globe, Bell, User, Power, Menu, Sparkles } from "lucide-react";

interface HeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  lang: "EN" | "AR";
  setLang: (lang: "EN" | "AR") => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  onSimulateAlert?: () => void;
}

export default function Header({ 
  searchText, 
  setSearchText, 
  lang, 
  setLang,
  sidebarOpen,
  setSidebarOpen,
  copilotOpen,
  setCopilotOpen,
  onSimulateAlert
}: HeaderProps) {
  const [placeholder, setPlaceholder] = useState("QUERY SYSTEM COMMAND...");
  const [notificationsCount, setNotificationsCount] = useState(2);
  const [wordCount, setWordCount] = useState(0);

  const placeholderPhrases = [
    "QUERY INTEL SYSTEM...",
    "SEARCH PROJECT 'GTA VI'...",
    "ANALYZE RECENT HARDWARE LEAKS...",
    "FETCH LATEST SAUDI SEO TRENDS...",
  ];

  // Dynamically update draft writing metrics
  const updateMetrics = () => {
    const enText = localStorage.getItem("g4arab_englishText") || "";
    const arText = localStorage.getItem("g4arab_arabicText") || "";
    const combined = `${enText} ${arText}`.trim();
    if (combined === "") {
      setWordCount(0);
    } else {
      const count = combined.split(/\s+/).filter(Boolean).length;
      setWordCount(count);
    }
  };

  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, 1000);
    window.addEventListener("storage", updateMetrics);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateMetrics);
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholderPhrases.length;
      setPlaceholder(placeholderPhrases[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const isRtl = lang === "AR";

  return (
    <header 
      dir={isRtl ? "rtl" : "ltr"}
      className="sticky top-0 z-45 flex justify-between items-center w-full px-6 md:px-8 h-16 bg-slate-950/75 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] select-none transition-all duration-300"
    >
      {/* Search Bar / Input Area */}
      <div className="flex items-center flex-1 max-w-lg">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-xl transition-all duration-300 border flex items-center justify-center cursor-pointer ${
            isRtl ? "ml-4" : "mr-4"
          } ${
            sidebarOpen 
              ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
              : "bg-white/5 border-white/5 text-slate-400 hover:text-indigo-400 hover:bg-white/10 hover:border-white/10"
          }`}
          title={lang === "EN" ? "Toggle Sidebar" : "إظهار/إخفاء القائمة الجانبية"}
        >
          <Menu className="w-4.5 h-4.5 text-inherit" />
        </button>

        <div className="relative w-full group">
          <Search className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5 pointer-events-none group-focus-within:text-cyan-400 transition-colors duration-200`} />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={lang === "EN" ? placeholder : "البحث في الملفات والمسودات والمؤشرات..."}
            className={`w-full bg-slate-900/60 border border-white/10 rounded-full py-1.5 ${isRtl ? "pr-11 pl-4 text-right" : "pl-11 pr-4 text-left"} text-xs font-mono text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 focus:outline-none transition-all duration-300 placeholder:text-slate-500 shadow-inner group-hover:border-white/15`}
          />
        </div>
      </div>

      {/* Control Actions & Info Section */}
      <div className={`flex items-center gap-3.5 md:gap-5 ${isRtl ? "mr-4" : "ml-4"}`}>
        {/* Language Select Pill Segment Switcher */}
        <div className="flex bg-slate-900 border border-white/5 rounded-xl p-0.5">
          <button
            onClick={() => setLang("EN")}
            className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest transition-all duration-300 cursor-pointer ${
              lang === "EN"
                ? "bg-slate-800 text-cyan-400 shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("AR")}
            className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest transition-all duration-300 cursor-pointer ${
              lang === "AR"
                ? "bg-slate-800 text-cyan-400 shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/5"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            AR
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2.5 text-slate-400">
          {/* Toggle Copilot Button (Styled like Notion/Substack right drawer trigger with an intelligible text label) */}
          <button 
            onClick={() => setCopilotOpen(!copilotOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 border cursor-pointer ${
              copilotOpen 
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                : "bg-slate-900 border-white/5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
            }`}
            title={lang === "EN" ? "Toggle Smart Copilot Grid" : "إظهار/إخفاء المساعد الذكي"}
          >
            <Sparkles className="w-3.5 h-3.5 text-inherit text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-sans font-bold tracking-tight text-slate-300">
              {lang === "EN" ? "AI Copilot" : "المساعد الذكي"}
            </span>
          </button>

          {/* Premium User Editorial Profile Capsule */}
          <div className={`flex items-center gap-3.5 ${isRtl ? "border-r mr-1 pr-3.5" : "border-l ml-1 pl-3.5"} border-white/10`}>
            <div className={`text-right hidden sm:block ${isRtl ? "text-right" : "text-left"}`}>
              <p className="font-sans text-[11px] font-extrabold leading-none text-white tracking-tight">
                {lang === "EN" ? "CHIEF EDITOR" : "رئيس التحرير"}
              </p>
              <p className="text-[8px] text-amber-400 font-mono uppercase tracking-widest font-black mt-1">
                {lang === "EN" ? "VERIFIED PUBLISHER" : "ناشر رسمي معتمد"}
              </p>
            </div>
            
            <div className="w-8.5 h-8.5 rounded-full p-0.5 bg-gradient-to-tr from-amber-500/30 to-cyan-400/30 hover:from-amber-400 hover:to-cyan-400 select-none shadow-[0_2px_15px_rgba(30,27,75,0.4)] hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden border border-slate-900">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKIxiDCLP2pFz_HL_P0ZXcr3WAGB4oAb6XJOoxxPGFJjTdB53VcvwSdwzy37C7N0SFU0pslq4OU7qAyVOjxxMJFevwrx6-IXVwp9ledh54rTihMtJ1A_vvua_nluaFQSHVbDGUP-oADvEUpgW4J4rlWPXCUjyw7ahYsacmBEIc0o9_TocnuvV6wioKvdu0kl0AtKhjztU-EZPkoCApnyBl5MzIghwhdNszGhaMbkK84Xmm5Lpjk1-yKV5UEhqWYuEV8XQpPpT7tvsY"
                  alt="Operator Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
