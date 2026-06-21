import React, { useState, useEffect } from "react";

interface FooterProps {
  lang: "EN" | "AR";
}

export default function Footer({ lang }: FooterProps) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Calculate GMT+3 for Riyadh
      const now = new Date();
      const localTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (3 * 3600000));
      
      const hours = String(localTime.getHours()).padStart(2, "0");
      const minutes = String(localTime.getMinutes()).padStart(2, "0");
      const seconds = String(localTime.getSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds} GMT+3`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const breakingNews = [
    "BREAKING: RUMOR SUGGESTS SONY WILL REVEAL PS6 COOLING CHAMBER PATENTS WITHIN 48 HOURS...",
    "INTEL REPORT: GEFORCE RTX 5090 BANDWIDTH LEAKS REVEAL 512-BIT GDDR7 CONFIGURATION...",
    "SAUDI ESPORTS WORLD CUP: PEAK STREAMING LATENCY TO MEA NODES DECREASES TO 8MS...",
    "GTA VI WATER SIMULATION SPECULATION TRENDING OVER 540% IN MENA SOCIAL HUBS...",
  ];

  const [marqueeIndex, setMarqueeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueeIndex((prev) => (prev + 1) % breakingNews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`fixed bottom-0 ${lang === "AR" ? "right-[260px] left-0 border-l" : "left-[260px] right-0 border-r"} z-40 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md h-8 border-t border-white/10 font-mono text-[10px] select-none text-slate-400 transition-all duration-300`}>
      {/* System status & scrolling marquee ticker */}
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
        <span className="text-cyan-400 uppercase font-bold flex items-center gap-1.5 whitespace-nowrap">
          <span className="inline-block w-1.5 h-1.5 bg-cyan-450 rounded-full animate-ping"></span>
          {lang === "EN" ? "STATUS: OPTIMAL" : "حالة النظام: مثالية"}
        </span>
        <span className="text-white/10">|</span>
        
        {/* Marquee Ticker */}
        <div className="relative flex-1 h-4 overflow-hidden mask-right">
          <div className="absolute inset-0 flex items-center animate-pulse text-slate-350 truncate">
            {breakingNews[marqueeIndex]}
          </div>
        </div>
      </div>

      {/* Quick Links & Real Saudi Time */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors">
            {lang === "EN" ? "PRIVACY" : "الخصوصية"}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {lang === "EN" ? "TERMS" : "الشروط"}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {lang === "EN" ? "SUPPORT" : "الدعم الفني"}
          </a>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <span className="text-indigo-400 font-sans font-bold select-none whitespace-nowrap">
          {timeStr}
        </span>
      </div>
    </footer>
  );
}
