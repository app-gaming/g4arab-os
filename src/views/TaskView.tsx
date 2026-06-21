import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Tag,
  UserCheck
} from "lucide-react";
import { KanbanTask } from "../types";

interface TaskViewProps {
  searchText: string;
  lang: "EN" | "AR";
}

export default function TaskView({ searchText, lang }: TaskViewProps) {
  // Initial kanban state with dual language support
  const [tasks, setTasks] = useState<KanbanTask[]>([
    {
      id: "task-1",
      title: lang === "EN" 
        ? "GTA VI Leak Analysis: Frame-by-Frame Breakdown" 
        : "تحليل تسريبات GTA VI: تفكيك العرض الترويجي إطارًا تلو الآخر",
      type: lang === "EN" ? "Leak analysis" : "تحليل تسريب",
      status: "backlog",
      priority: "Emergency",
      assignee: {
        name: "Sarah Jenkins",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB77W-EUIxJLNMiYIz5vOCp87bUUa4oml6izgHZu3hXFsWOb_FHJpVytTNYWFh1DmbyWnC9b71QeHAHI-XjCKpYh7mAL-XtWOs0dB1NBzPK2k4Hd3cRXs_MSD4kC3teDJ3AZJ0d-mcoOPnj3iX3NHepxCKOSuj7Ati198Qo9TgDhJkK__3yMsHDQGtTb7V-8BVPo7tdGjOvkRWJ6HKjAq3ozyM_Js1uODXJoJxj6Ax2wAQO8ICeY2DDh65MsJkzJRrTWE_GxelzZAA"
      },
      dueDate: lang === "EN" ? "2h left" : "بقي ساعتان",
    },
    {
      id: "task-2",
      title: lang === "EN"
        ? "The Evolution of Souls-like: 2024 Retrospective"
        : "تطور ألعاب الـ Souls-like: استرجاع تحليلي شامل لعام ٢٠٢٤",
      type: lang === "EN" ? "Feature Article" : "مقال مميز",
      status: "backlog",
      priority: "Feature",
      assignee: {
        name: "Digital Journalist",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC332EOw_xqL37UztOyV2jYBjuRY6fEYf_X_jKBlqiD7MU5fQgHvnhzZtGxugUGkkqzOJA72KXxJjT6rJl3wyDJfqp1JAaqYf5ye4DvsdXJ2zuxfoOH6EnDR3ugEqkd8QAPXd1OpUMDeqwv-d64r98_TjRKiCi7xoJuvtA8VbmP_MMfh3LxZcPDZ6EMyHztNdjl2fBxNsAYiLjxAhH0szHWzmlIe_CohvkDayaw2ogAIlP9XIcOeBbmnplbqd8RitHpEATRD4I3C7l0"
      },
      dueDate: "Aug 15",
    },
    {
      id: "task-3",
      title: lang === "EN"
        ? "RTX 5090 Spec Speculation & Thermal Testing"
        : "توقعات مواصفات RTX 5090 واختبارات الأداء الحراري في المعامل",
      type: lang === "EN" ? "Video Editing" : "مونتاج فيديو",
      status: "production",
      priority: "Video Editing",
      assignee: {
        name: "Kaito Arata",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpMt0uXJ1WaLiCotoRWFEjzVnz3UFWDkVBGqgFquALPCYwAj9hXBAjPzoBRbXuaGTCVttnslAlNZzUQn2zinwfLfBT7wz725Blb3qgcV4YtVq51IySCPKrQi32iooIH-iFxmBKrQoTRNO60sIq1hEkheCxY7aaOx_OjnCQFqfpkJd6FDiIgp7X1zXsw5D8Wvvy2JW0CUI3q5qIks7YkoGZBlWML2HQ1w1uaw4aFq2DzMYgJtKG_46bJ4WJv7cqwjMtSDtdOtg10hYr"
      },
      dueDate: lang === "EN" ? "Today" : "اليوم",
      progress: 82,
    },
    {
      id: "task-4",
      title: lang === "EN"
        ? "E3 2025: The Resurrection Rumor Mill"
        : "معرض E3 25: طاحونة الشائعات حول عودة المحفل الأكبر للعب",
      type: lang === "EN" ? "Scripting" : "كتابة سكريبت",
      status: "production",
      priority: "Scripting",
      assignee: null,
      dueDate: lang === "EN" ? "Next week" : "الأسبوع المقبل",
      progress: 45,
    },
    {
      id: "task-5",
      title: lang === "EN"
        ? "Saudi eSports World Cup: Event Hub Sync"
        : "كأس العالم للرياضات الإلكترونية في السعودية: مزامنة الحدث",
      type: lang === "EN" ? "Quality Assurance" : "مراجعة الجودة",
      status: "review",
      priority: "Quality Assurance",
      assignee: {
        name: "Sarah Jenkins",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC619-bVOUeHe8ZuMcCFIz4UHPCz9yGKKSmf74TIYAOOMVVP-hwqCfz2zMB-ygylkr9VLxfl5KMkL_OeXVgXKE5fJ_8kJYGoqvoWQDbKLebKixZFv9NQITnHX4fZ02vKh22Jswcr2Qa7b8-TKbYfb-LAw8vf1HBWIzcNZYSHnrFCisukBV6qcsXGQtW46MUa2_Ch2xYqGKRUCv6J-ZvRnL_YSrnsTpILNT2aenYiF_oOvfb060dEIH6YPTg3M6lLdesZHDEJ5gRfoDv"
      },
      dueDate: lang === "EN" ? "Tomorrow" : "غدًا",
      arabicQuote: lang === "EN" ? "Check the font weight on the Arabic headlines before push." : "افحص سماكة الخط في العناوين العربية بعناية قبل الترحيل للمخزن المباشر."
    },
    {
      id: "task-6",
      title: lang === "EN" ? "Weekly Gaming Wrap-up: Ep 42" : "ملخص الألعاب الأسبوعي: الحلقة ٤٢",
      type: lang === "EN" ? "Finalized broadcast" : "البث النهائي المجمد",
      status: "ready",
      priority: "Finalized",
      assignee: null,
      dueDate: lang === "EN" ? "Synced 10m ago" : "تزامن قبل ١٠ دقائق",
    }
  ]);

  // Form Task creation states
  const [showAddForm, setShowAddForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formPriority, setFormPriority] = useState<any>("Feature");
  const [formStatus, setFormStatus] = useState<any>("backlog");

  // Move task step-by-step
  const moveTask = (taskId: string, direction: "next" | "prev") => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      
      const statuses: Array<"backlog" | "production" | "review" | "ready"> = ["backlog", "production", "review", "ready"];
      const currentIndex = statuses.indexOf(task.status);
      let nextIndex = currentIndex;
      
      if (direction === "next" && currentIndex < statuses.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (direction === "prev" && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }
      
      return { 
        ...task, 
        status: statuses[nextIndex],
        progress: statuses[nextIndex] === "ready" ? 100 : task.progress
      };
    }));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newTask: KanbanTask = {
      id: "task-" + Date.now(),
      title: formTitle,
      type: formPriority + (lang === "EN" ? " Task" : " مهمة"),
      status: formStatus,
      priority: formPriority,
      assignee: {
        name: lang === "EN" ? "Admin Control" : "إدارة العمليات",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKIxiDCLP2pFz_HL_P0ZXcr3WAGB4oAb6XJOoxxPGFJjTdB53VcvwSdwzy37C7N0SFU0pslq4OU7qAyVOjxxMJFevwrx6-IXVwp9ledh54rTihMtJ1A_vvua_nluaFQSHVbDGUP-oADvEUpgW4J4rlWPXCUjyw7ahYsacmBEIc0o9_TocnuvV6wioKvdu0kl0AtKhjztU-EZPkoCApnyBl5MzIghwhdNszGhaMbkK84Xmm5Lpjk1-yKV5UEhqWYuEV8XQpPpT7tvsY"
      },
      dueDate: lang === "EN" ? "No deadline" : "بدون موعد نهائي",
      progress: formStatus === "ready" ? 100 : (formStatus === "production" ? 10 : undefined)
    };

    setTasks(prev => [...prev, newTask]);
    setFormTitle("");
    setShowAddForm(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const columns = [
    { id: "backlog" as const, titleEN: "Backlog", titleAR: "مسودة الأفكار", color: "border-t border-slate-500" },
    { id: "production" as const, titleEN: "In Production", titleAR: "قيد المونتاج والكتابة", color: "border-t border-indigo-400" },
    { id: "review" as const, titleEN: "Review", titleAR: "المراجعة والتدقيق", color: "border-t border-cyan-400" },
    { id: "ready" as const, titleEN: "Ready for Sync", titleAR: "جاهز للنشر والمزامنة", color: "border-t border-emerald-450" }
  ];

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchText.toLowerCase()) || 
    t.priority.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none relative z-10" dir={lang === "AR" ? "rtl" : "ltr"}>
      
      {/* Board Header Title bar */}
      <div className="flex justify-between items-end border-b border-white/10 pb-5">
        <div>
          <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight">
            {lang === "EN" ? "Mission Board" : "لوحة متابعة المهام والعمليات"}
          </h2>
          <p className="font-mono text-xs text-indigo-300 mt-1.5">
            {lang === "EN" ? "Dual-language Kanban Workspace" : "مساحة تنظيم وتتبع إنتاج محتوى الألعاب الفوري"}
          </p>
        </div>

        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4.5 py-2.5 bg-indigo-505 hover:bg-indigo-600 text-white font-sans font-bold rounded-xl hover:brightness-110 shadow-lg shadow-indigo-505/20 text-xs flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider"
        >
          <Plus className="w-4 h-4 text-inherit stroke-[3px]" />
          {lang === "EN" ? "Add Campaign" : "إضافة مهمة جديدة"}
        </button>
      </div>

      {/* Add New Task Modal/Dialog Form (Frosted Glass Style) */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/90 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-4 text-left" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
            <h3 className="font-sans font-extrabold text-indigo-300 text-base">
              {lang === "EN" ? "Launch Content Campaign" : "إطلاق حملة ومهمة جديدة"}
            </h3>
            
            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-mono uppercase tracking-wider block">
                  {lang === "EN" ? "Campaign / Article Title" : "عنوان الحملة أو المهمة"}
                </label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder={lang === "EN" ? "e.g., PS6 Thermal Architecture deep dive" : "مثال: مراجعة عميقة للأداء الحراري لجهاز PS6"} 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-550 focus:ring-1 focus:ring-indigo-550 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Category" : "التصنيف"}
                  </label>
                  <select 
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:ring-0 focus:outline-none"
                  >
                    <option value="Emergency">{lang === "EN" ? "Emergency" : "عاجل جداً"}</option>
                    <option value="Feature">{lang === "EN" ? "Feature" : "مقال مميز"}</option>
                    <option value="Video Editing">{lang === "EN" ? "Video Editing" : "مونتاج فيديو"}</option>
                    <option value="Scripting">{lang === "EN" ? "Scripting" : "سكريبت"}</option>
                    <option value="Quality Assurance">{lang === "EN" ? "Quality Assurance" : "مراجعة جودة"}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono uppercase tracking-wider block">
                    {lang === "EN" ? "Board Segment" : "مكان العمود"}
                  </label>
                  <select 
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:ring-0 focus:outline-none"
                  >
                    <option value="backlog">{lang === "EN" ? "Backlog / Drafts" : "قائمة الأفكار"}</option>
                    <option value="production">{lang === "EN" ? "In Production" : "قيد الإنتاج والتنفيذ"}</option>
                    <option value="review">{lang === "EN" ? "Review Queue" : "بانتظار المراجعة"}</option>
                    <option value="ready">{lang === "EN" ? "Ready to Sync" : "جاهز للنشر والمزامنة"}</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-400 rounded-xl font-mono uppercase tracking-widest text-[10px] cursor-pointer"
                >
                  {lang === "EN" ? "Cancel" : "إلغاء"}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-505 text-white font-sans font-bold rounded-xl hover:bg-indigo-600 cursor-pointer text-[10px] uppercase tracking-wider"
                >
                  {lang === "EN" ? "Create Task" : "إضافة للمخطط"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kanban Board Fluid Columns (4 Columns with Frosted Glass Panels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto pb-8 custom-scrollbar">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col gap-4 min-w-[280px] shadow-xl">
              
              {/* Column Title and count */}
              <div className="flex justify-between items-center px-1 select-none">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans font-bold text-white text-sm">
                    {lang === "EN" ? col.titleEN : col.titleAR}
                  </h3>
                  <span className="bg-slate-950/45 text-slate-300 font-mono text-[9px] px-2 py-0.5 rounded-full font-extrabold border border-white/10">
                    {String(colTasks.length).padStart(2, "0")}
                  </span>
                </div>
                
                {col.id === "backlog" && (
                  <button 
                    onClick={() => setShowAddForm(true)}
                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <Plus className="w-4 h-4 cursor-pointer" />
                  </button>
                )}
              </div>

              {/* Column Segment ribbon */}
              <div className={`h-1 w-12 bg-gradient-to-r rounded ${
                col.id === "ready" ? "from-emerald-400 to-green-400" :
                col.id === "review" ? "from-cyan-400 to-indigo-400" :
                col.id === "production" ? "from-indigo-400 to-purple-400" :
                "from-slate-400 to-slate-600"
              }`} />

              {/* Kanban Column Cards List */}
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[580px] pr-1">
                {colTasks.length === 0 ? (
                  <div className="py-12 border border-dashed border-white/5 rounded-2xl flex items-center justify-center text-center">
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                      {lang === "EN" ? "Segment Empty" : "لا توجد مهام نشطة"}
                    </p>
                  </div>
                ) : (
                  colTasks.map((task) => {
                    return (
                      <div 
                        key={task.id} 
                        className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-indigo-500/40 hover:bg-white/10 transition-all duration-300 relative group shadow-md"
                      >
                        {/* Upper Badges & Delete */}
                        <div className="flex justify-between items-start mb-3">
                          <span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase flex items-center gap-1 ${
                            task.priority === "Emergency" ? "bg-red-550/10 text-red-400 border border-red-500/25" :
                            task.priority === "Feature" ? "bg-indigo-500/10 text-indigo-300 border border-indigo-550/25" :
                            task.priority === "Video Editing" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/25" :
                            task.priority === "Scripting" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/25" :
                            "bg-green-500/10 text-green-400 border border-green-500/25"
                          }`}>
                            {task.priority === "Emergency" && <AlertCircle className="w-2.5 h-2.5 animate-pulse" />}
                            {task.priority}
                          </span>

                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-slate-400/40 hover:text-red-500 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100"
                            title="Delete Campaign"
                          >
                            <Trash2 className="w-3.5 h-3.5 cursor-pointer" />
                          </button>
                        </div>

                        {/* Title text */}
                        <h4 className="font-sans font-extrabold text-xs text-slate-100 leading-snug group-hover:text-indigo-350 transition-colors mb-3">
                          {task.title}
                        </h4>

                        {/* Visual Arabic Quote for Reviews */}
                        {task.arabicQuote && (
                          <div className="mb-4 p-2 bg-indigo-500/5 border-l-2 border-indigo-400 rounded text-[10px] italic text-slate-300">
                            &quot;{task.arabicQuote}&quot;
                          </div>
                        )}

                        {/* Progress meter inside kanban card */}
                        {task.progress !== undefined && (
                          <div className="space-y-1 mb-4 select-none">
                            <div className="flex justify-between text-[10px] font-mono leading-none">
                              <span className="text-slate-400">{lang === "EN" ? "Progress" : "نسبة الانجاز"}</span>
                              <span className="text-indigo-300 font-bold">{task.progress}%</span>
                            </div>
                            <div className="h-1 bg-slate-950/45 w-full rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500" style={{ width: `${task.progress}%` }}></div>
                            </div>
                          </div>
                        )}

                        {/* User Check metadata */}
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                          {task.assignee ? (
                            <div className="flex items-center gap-1.5 overflow-hidden select-none">
                              <img 
                                src={task.assignee.avatar} 
                                alt={task.assignee.name} 
                                className="w-5.5 h-5.5 rounded-full object-cover border border-indigo-500/40 shrink-0"
                              />
                              <span className="text-[10px] text-slate-300 truncate font-sans">{task.assignee.name}</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono italic">{lang === "EN" ? "Unassigned" : "غير معينة"}</span>
                          )}

                          <div className="flex items-center gap-1 text-slate-400 shrink-0">
                            <Clock className="w-3 h-3 text-indigo-400" />
                            <span className="text-[10px] font-mono text-inherit">{task.dueDate}</span>
                          </div>
                        </div>

                        {/* Transition Arrows Overlay for tactile operations */}
                        <div className="flex justify-between items-center mt-3 pt-2">
                          <button 
                            onClick={() => moveTask(task.id, "prev")}
                            disabled={col.id === "backlog"}
                            className="p-1 rounded bg-slate-950 border border-white/10 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-slate-900 text-slate-400 hover:text-cyan-400"
                            title="Move segment left"
                          >
                            <ArrowLeft className="w-3 h-3 cursor-pointer" />
                          </button>
                          
                          <button 
                            onClick={() => moveTask(task.id, "next")}
                            disabled={col.id === "ready"}
                            className="p-1 rounded bg-slate-950 border border-white/10 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-slate-900 text-slate-400 hover:text-indigo-400"
                            title="Move segment right"
                          >
                            <ArrowRight className="w-3 h-3 cursor-pointer" />
                          </button>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
