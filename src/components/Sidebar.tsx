import React from "react";
import { 
  Terminal, 
  LayoutDashboard, 
  FolderGit2, 
  Video, 
  BarChart3, 
  Database, 
  Archive, 
  CheckSquare, 
  Settings,
  ShieldCheck,
  CreditCard,
  Activity
} from "lucide-react";
import { ViewType } from "../types";

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  lang: "EN" | "AR";
  open: boolean;
}

export default function Sidebar({ currentView, setView, lang, open }: SidebarProps) {
  const menuItems = [
    {
      view: "Mission Control" as ViewType,
      labelEN: "Mission Control",
      labelAR: "غرفة التحكّم",
      icon: LayoutDashboard,
    },
    {
      view: "Dashboard" as ViewType,
      labelEN: "Leaks & News",
      labelAR: "الأخبار والتسريبات",
      icon: Activity,
    },
    {
      view: "Task Management" as ViewType,
      labelEN: "Task Management",
      labelAR: "إدارة المهام",
      icon: CheckSquare,
    },
    {
      view: "Studio" as ViewType,
      labelEN: "Studio",
      labelAR: "الاستوديو المتخصّص",
      icon: Video,
    },
    {
      view: "Sources" as ViewType,
      labelEN: "Sources",
      labelAR: "مصادر الإدخال",
      icon: Database,
    },
    {
      view: "Analytics" as ViewType,
      labelEN: "Analytics",
      labelAR: "التحليلات والمراقبة",
      icon: BarChart3,
    },
    {
      view: "Archives" as ViewType,
      labelEN: "Archives",
      labelAR: "الأرشيف التقني",
      icon: Archive,
    },
    {
      view: "Subscriptions" as ViewType,
      labelEN: "Subscriptions",
      labelAR: "الاشتراكات وترقيات النظام",
      icon: CreditCard,
    },
  ];

  return (
    <aside className={`fixed ${lang === "AR" ? "right-0 border-l" : "left-0 border-r"} top-0 h-full w-[260px] bg-white/5 border-white/10 backdrop-blur-xl flex flex-col z-50 select-none shadow-2xl transition-all duration-300 ${
      open 
        ? "translate-x-0" 
        : lang === "AR" ? "translate-x-[260px]" : "-translate-x-[260px]"
    }`}>
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/35">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-lg text-white leading-none tracking-tight">
            G4Arab OS
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-indigo-300 mt-1.5">
            {lang === "EN" ? "AI TERMINAL" : "محطة ذكاء اصطناعي"}
          </p>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-mono text-xs tracking-wide transition-all duration-200 ${
                isActive
                  ? `text-white bg-white/10 shadow-inner ${lang === "AR" ? "border-r-4 border-l-0" : "border-l-4 border-r-0"} border-indigo-500`
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? "text-indigo-400" : "text-inherit"}`} />
              <span>{lang === "EN" ? item.labelEN : item.labelAR}</span>
            </button>
          );
        })}

        <div className="h-px bg-white/10 my-2" />

        {/* Settings view item */}
        <button
          onClick={() => setView("Settings")}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-mono text-xs tracking-wide transition-all duration-200 ${
            currentView === "Settings"
              ? `text-white bg-white/10 shadow-inner ${lang === "AR" ? "border-r-4 border-l-0" : "border-l-4 border-r-0"} border-indigo-500`
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Settings className={`w-4.5 h-4.5 ${currentView === "Settings" ? "text-indigo-400" : "text-inherit"}`} />
          <span>{lang === "EN" ? "Settings" : "الإعدادات"}</span>
        </button>
      </nav>

      {/* System Status Info Notice */}
      <div className="mx-4 mb-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-300">
            {lang === "EN" ? "Riyadh Node" : "عقدة الرياض"}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-450"></span>
          </span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-350 font-sans">
          {lang === "EN" 
            ? "Network load: 14.2 TB/s. System status nominal." 
            : "حِمل الشبكة: ١٤.٢ ت.ب/ث. حالة النظام مثالية."}
        </p>
      </div>

      {/* Premium User Profile Widget */}
      <div className="p-4 border-t border-white/5 bg-slate-950/20">
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/10 group hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-400 shadow-md">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPAKyxekb_PYNHNyQspy9oq8yDdFDnt3wnfypamrJCGRXNhFSF2kLidebdGc1YhzNWotLKV2Zj93DtmCW42IamF2Z8ICCe2J70UYQlBHm5wIyx_Pa9pEiiuQ_fkuRbwd6szQC1rAswOyh7Tlcy3TdQGIS6WKZReJzBKSX8NBZbpdzPiQu1UQWFFNCcNHxuTYjgzd5U3k9vTPzgkOgqVy9aBvtMJagHLlW9ekLBTW7rjw3XuCo9CTaboQmGPaMkSD3EaV_-zrx2LC-9" 
              alt="SYS_ADMIN" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate font-sans">Commander_G4</p>
            <p className="text-[9px] text-cyan-400 font-mono tracking-wider uppercase font-medium flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 inline" /> LVL 99 ACCESS
            </p>
          </div>
          <Settings onClick={() => setView("Settings")} className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-400 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
