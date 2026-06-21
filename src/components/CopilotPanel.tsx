import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  Trash2, 
  Terminal, 
  Workflow, 
  Compass, 
  Users, 
  Bot, 
  Loader2,
  CheckCircle,
  HelpCircle,
  Clock
} from "lucide-react";
import { TeamMember } from "../types";

interface CopilotPanelProps {
  onApplyPreset?: (text: string) => void;
  lang: "EN" | "AR";
  open: boolean;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function CopilotPanel({ onApplyPreset, lang, open }: CopilotPanelProps) {
  const [activeTab, setActiveTab] = useState<"Chat" | "Analysis" | "Actions">("Chat");
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: lang === "EN" 
        ? "Greetings, Commander. I am your Copilot Assistant. Based on logistics tracking, there is a 78% probability that Sony will announce the PS5 Pro specs soon. Should I prepare an editorial draft template?"
        : "تحياتي، أيها القائد. أنا مساعدك الشخصي Copilot. وبناءً على البيانات واللوجستيات المتاحة، هناك احتمال بنسبة ٧٨٪ أن تقوم شركة Sony بالإعلان عن مواصفات PS5 Pro قريبًا. هل ترغب في إعداد مسوّدة ترويجية مخصّصة؟"
    }
  ]);
  const [loadingChat, setLoadingChat] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Jenkins",
      role: "Lead Editor",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC619-bVOUeHe8ZuMcCFIz4UHPCz9yGKKSmf74TIYAOOMVVP-hwqCfz2zMB-ygylkr9VLxfl5KMkL_OeXVgXKE5fJ_8kJYGoqvoWQDbKLebKixZFv9NQITnHX4fZ02vKh22Jswcr2Qa7b8-TKbYfb-LAw8vf1HBWIzcNZYSHnrFCisukBV6qcsXGQtW46MUa2_Ch2xYqGKRUCv6J-ZvRnL_YSrnsTpILNT2aenYiF_oOvfb060dEIH6YPTg3M6lLdesZHDEJ5gRfoDv",
      tasksCount: 3,
      capacity: 85
    },
    {
      name: "Kaito Arata",
      role: "Motion Graphics",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpMt0uXJ1WaLiCotoRWFEjzVnz3UFWDkVBGqgFquALPCYwAj9hXBAjPzoBRbXuaGTCVttnslAlNZzUQn2zinwfLfBT7wz725Blb3qgcV4YtVq51IySCPKrQi32iooIH-iFxmBKrQoTRNO60sIq1hEkheCxY7aaOx_OjnCQFqfpkJd6FDiIgp7X1zXsw5D8Wvvy2JW0CUI3q5qIks7YkoGZBlWML2HQ1w1uaw4aFq2DzMYgJtKG_46bJ4WJv7cqwjMtSDtdOtg10hYr",
      tasksCount: 1,
      capacity: 40
    }
  ];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loadingChat]);

  // Handle Real-Time Chat API
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || loadingChat) return;

    const userText = inputVal;
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInputVal("");
    setLoadingChat(true);

    try {
      // Map history to standard payload
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        text: m.text
      }));

      const res = await fetch("/api/copilot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: historyPayload }),
      });

      if (!res.ok) throw new Error("Translation gateway busy");
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.text }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: lang === "EN"
          ? "Network traffic is currently peaking in Riyadh. Standby mode active."
          : "حِمل الشبكة مرتفع حاليًا في الرياض. خدمة المساعد الاحتياطي مفعّلة." 
      }]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleApplyPresetText = () => {
    if (onApplyPreset) {
      const preset = 
        "GTA VI Speculation: With rumors suggesting Cloud Gaming support globally on day one, editorial pipelines are indexing huge traffic spikes in Saudi Arabia and the GCC region.";
      onApplyPreset(preset);
      setMessages(prev => [...prev, {
        role: "assistant",
        text: lang === "EN" 
          ? "Applied Cloud Gaming context recommendation to the Pro Editor draft."
          : "تم تطبيق توصية سياق 'الألعاب السحابية' بنجاح إلى مسودّة الاستوديو التحريرية."
      }]);
    }
  };

  return (
    <aside className={`bg-white/5 ${lang === "AR" ? "border-r" : "border-l"} border-white/10 backdrop-blur-xl flex flex-col h-full shrink-0 select-none shadow-2xl relative z-10 transition-all duration-300 overflow-hidden ${
      open 
        ? "w-[320px] opacity-100" 
        : "w-0 opacity-0 border-r-0 border-l-0 pointer-events-none"
    }`}>
      {/* Header Info */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-sans font-extrabold text-white tracking-tight text-sm">
              Copilot Assistant
            </h2>
            <p className="font-sans text-[10px] text-indigo-200 mt-1">
              {lang === "EN" ? "AI Insights & Team Pulse" : "رؤى الذكاء وهيكلية الفريق"}
            </p>
          </div>
          <Bot className="w-5 h-5 text-indigo-400 animate-pulse" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-slate-950/20">
        {(["Chat", "Analysis", "Actions"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[10px] font-mono uppercase tracking-widest text-center transition-all cursor-pointer ${
              activeTab === tab
                ? "text-indigo-400 border-b-2 border-indigo-500 bg-white/5"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab === "Chat" && (lang === "EN" ? "Chat" : "الدردشة")}
            {tab === "Analysis" && (lang === "EN" ? "Analysis" : "التحليل")}
            {tab === "Actions" && (lang === "EN" ? "Actions" : "الإجراءات")}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-5">
        {activeTab === "Chat" && (
          <>
            {/* Quick Suggestion Box */}
            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-indigo-500/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 text-indigo-300 font-sans font-bold text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? "SUGGESTION" : "توصيات ذكية"}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3">
                {lang === "EN"
                  ? "Consider adding more context about Cloud Gaming in Riyadh node regions to capture trending search traffic today."
                  : "يُفضّل إضافة سياق يتعلّق بـ 'الألعاب السحابية' لتصدّر مؤشرات البحث النشطة في المملكة العربية السعودية اليوم."}
              </p>
              <button
                onClick={handleApplyPresetText}
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-[10px] font-mono tracking-wider transition-all duration-200 uppercase cursor-pointer shadow-lg shadow-indigo-500/20"
              >
                {lang === "EN" ? "APPLY MODIFICATION" : "تطبيق هذا التعديل"}
              </button>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 flex flex-col gap-3 min-h-[160px]">
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs max-h-[280px]"
              >
                {messages.map((m, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-2xl leading-relaxed border transition-all duration-300 ${
                      m.role === "assistant" 
                        ? "bg-white/5 border-white/10 text-slate-200" 
                        : "bg-indigo-500/10 border-indigo-500/35 text-white"
                    }`}
                  >
                    <p className="font-bold text-[9px] uppercase tracking-wider mb-1 text-slate-400">
                      {m.role === "assistant" ? "🛰️ Co-Pilot" : "👤 Commander"}
                    </p>
                    <p className="font-sans whitespace-pre-wrap">{m.text}</p>
                  </div>
                ))}
                {loadingChat && (
                  <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    <span className="font-mono text-[10px]">THINKING COORDINATES...</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "Analysis" && (
          <div className="space-y-5">
            {/* Active Team Members */}
            <div>
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3.5 font-mono">
                {lang === "EN" ? "Active Team Members" : "المحررون النشطون في الرياض"}
              </h4>
              <div className="space-y-3">
                {teamMembers.map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-9 h-9 rounded-full object-cover border border-indigo-400/40"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{member.name}</p>
                        <p className="text-[10px] text-slate-450">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-mono text-indigo-300 font-bold">{member.tasksCount} Tasks</p>
                      <p className="text-[9px] text-slate-400 font-mono">Cap: {member.capacity}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight Notice */}
            <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                  {lang === "EN" ? "AI Pulse Insight" : "توصية المؤشرات"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-200 font-sans">
                {lang === "EN"
                  ? "Based on traffic coordinates, merging RSS pipeline and YouTube streams on GTA VI analysis reduces token overhead by 34%."
                  : "بناءً على تتبع الاستهلاك، سيؤدي دمج خطوط RSS وقنوات يوتيوب إلى خفض الهدر في استهلاك الرموز البرمجية بنسبة ٣٤٪."}
              </p>
            </div>
          </div>
        )}

        {activeTab === "Actions" && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1 font-mono">
              {lang === "EN" ? "Suggested Actions" : "الإجراءات المقترحة"}
            </h4>

            {/* Action buttons */}
            <div className="grid gap-2">
              <button 
                onClick={() => setMessages(prev => [...prev, { role: "assistant", text: "Successfully de-duplicated spelling, alternative routes, and leaks index across 4 core nodes." }])}
                className="w-full text-left p-3 text-xs bg-slate-950/40 border border-white/10 hover:border-indigo-400 hover:bg-white/10 transition-colors rounded-xl flex items-center gap-2 group cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-mono text-slate-300 group-hover:text-white transition-colors">De-duplicate Silicon Leaks</span>
              </button>

              <button 
                onClick={() => setMessages(prev => [...prev, { role: "assistant", text: "Scraping engines increased from 15Hz to 18Hz. Fetching latency averages 4ms." }])}
                className="w-full text-left p-3 text-xs bg-slate-950/40 border border-white/10 hover:border-indigo-400 hover:bg-white/10 transition-colors rounded-xl flex items-center gap-2 group cursor-pointer"
              >
                <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-mono text-slate-300 group-hover:text-white transition-colors">Scale Twitter scraping +20%</span>
              </button>
            </div>

            {/* Quick Drag Box Area */}
            <div className="p-4 rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] text-slate-300 font-sans mb-3 leading-relaxed">
                {lang === "EN"
                  ? "Drag tasks or content sources here to auto-match workflows against team member availability."
                  : "اسحب المهام أو مصادر المحتوى هنا لتوزيعها ومطابقتها التلقائية مع قدرة فريق التحرير."}
              </p>
              <button 
                onClick={() => alert("Auto-Sync Engine successfully synced to Middle East news cycles.")}
                className="px-4 py-2 bg-indigo-500 text-white text-[10px] font-sans font-bold rounded-xl hover:bg-indigo-600 transition-all cursor-pointer shadow-lg shadow-indigo-500/25"
              >
                {lang === "EN" ? "ENABLE AUTO-SYNC" : "تمكين المزامنة الذكية"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="p-4 bg-slate-950/20 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={lang === "EN" ? "Ask Copilot or type instruct..." : "اسأل مساعد الذكاء الاصطناعي..."}
            className="w-full bg-slate-950/40 border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white focus:border-indigo-550 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 animate-pulse" />
          </button>
        </form>
      </div>
    </aside>
  );
}
