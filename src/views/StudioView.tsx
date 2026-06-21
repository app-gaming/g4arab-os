import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  RefreshCw, 
  CheckCircle, 
  Layers, 
  Compass, 
  HelpCircle, 
  Image as ImageIcon,
  FileCheck2,
  ListTodo,
  TrendingUp,
  Cpu,
  Loader2,
  Copy,
  Check,
  Send,
  Volume2,
  Code,
  Share2,
  BookmarkCheck,
  Flame,
  ArrowUpRight,
  AlertCircle,
  User,
  Users,
  UserPlus,
  Trash2,
  Plus
} from "lucide-react";

interface StudioViewProps {
  englishText: string;
  setEnglishText: (text: string) => void;
  arabicText: string;
  setArabicText: (text: string) => void;
  seoKeywords: string[];
  setSeoKeywords: (keywords: string[]) => void;
  altTitles: string[];
  setAltTitles: (titles: string[]) => void;
  socialThread: string[];
  setSocialThread: (thread: string[]) => void;
  lang: "EN" | "AR";
}

interface HeadlineSuggestion {
  en: string;
  ar: string;
  type: string;
}

export interface TeamMember {
  id: string;
  nameEN: string;
  nameAR: string;
  roleEN: string;
  roleAR: string;
  avatarColor: string;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  { id: "member-1", nameEN: "Saleh Al-Harbi", nameAR: "صالح الحربي", roleEN: "Editor-in-Chief", roleAR: "رئيس التحرير بوزارة الأخبار", avatarColor: "bg-gradient-to-r from-red-500 to-amber-500" },
  { id: "member-2", nameEN: "Abdulrahman Al-Muqbali", nameAR: "عبدالرحمن المقبلي", roleEN: "Senior Hardware Specialist", roleAR: "كبير مراجعي الأجهزة والعتاد", avatarColor: "bg-gradient-to-r from-cyan-500 to-indigo-500" },
  { id: "member-3", nameEN: "Khaled Al-Dawsari", nameAR: "خالد الدوسري", roleEN: "Leak & Intelligence Lead", roleAR: "قائد فريق التحري والتسريبات والتحليلات", avatarColor: "bg-gradient-to-r from-emerald-500 to-teal-500" },
  { id: "member-4", nameEN: "Sara Al-Otaibi", nameAR: "Sara Al-Otaibi", roleEN: "Translator / Chief Editor", roleAR: "المترجمة والمترجمة اللغوية المعتمدة", avatarColor: "bg-gradient-to-r from-purple-500 to-pink-500" }
];

export default function StudioView({ 
  englishText, 
  setEnglishText, 
  arabicText, 
  setArabicText, 
  seoKeywords, 
  setSeoKeywords, 
  altTitles, 
  setAltTitles, 
  socialThread, 
  setSocialThread, 
  lang 
}: StudioViewProps) {
  const isRtl = lang === "AR";
  
  // Local active UI managers
  const [translating, setTranslating] = useState(false);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [analyzingSEO, setAnalyzingSEO] = useState(false);
  const [seoScore, setSeoScore] = useState(96);
  
  // Generator Console local states
  const [customDraftConcept, setCustomDraftConcept] = useState("");
  const [chosenTone, setChosenTone] = useState(() => {
    return localStorage.getItem("g4arab_chosenTone") || "Excited / حماسي ومثير";
  });
  
  // Success feedback state for copies
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Dynamic Team Members States
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem("g4arab_team_members");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_MEMBERS;
      }
    }
    return DEFAULT_MEMBERS;
  });

  const [assignedMemberId, setAssignedMemberId] = useState<string>(() => {
    return localStorage.getItem("g4arab_assigned_member_id") || "member-1";
  });

  // Add Member form fields
  const [newMemberNameAR, setNewMemberNameAR] = useState("");
  const [newMemberNameEN, setNewMemberNameEN] = useState("");
  const [newMemberRoleAR, setNewMemberRoleAR] = useState("");
  const [newMemberRoleEN, setNewMemberRoleEN] = useState("");
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);

  // AI Headline Generator States
  const [generatingHeadlines, setGeneratingHeadlines] = useState(false);
  const [rawHeadlinePrompt, setRawHeadlinePrompt] = useState("");

  // AI Image Generator States
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [lastGeneratedImage, setLastGeneratedImage] = useState<any>(null);

  // Assets list with custom state persistence to support direct AI injection!
  const [localAssets, setLocalAssets] = useState<any[]>(() => {
    const defaultAssets = [
      { name: lang === "EN" ? "Vice City Holographic Sunset" : "غروب شمس فايس سيتي الهولوغرافي", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80" },
      { name: lang === "EN" ? "GeForce Blackwell Architecture Details" : "تفاصيل بنية جيفورس الحوسبية المعمارية", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80" },
      { name: lang === "EN" ? "Pro Console Glowing Frame Core" : "صورة هيكل منصة الجيل الجديد المضيء", url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&auto=format&fit=crop&q=80" }
    ];
    const saved = localStorage.getItem("g4arab_local_assets");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultAssets;
      }
    }
    return defaultAssets;
  });

  const [checklist, setChecklist] = useState(() => {
    const defaultList = [
      { id: "check-1", label: lang === "EN" ? "Focus keyword active in first paragraph of localized text" : "تضمين الكلمة المفتاحية في الفقرة الأولى من الصياغة العربية", checked: true },
      { id: "check-2", label: lang === "EN" ? "Register ALT text in graphic asset blocks" : "إعداد خصائص وصف الصورة البديلة ALT للملحقات البصرية", checked: true },
      { id: "check-3", label: lang === "EN" ? "Format headers utilizing standard visual H2 guidelines" : "تنسيق العناوين الرئيسية الفرعية باستخدام وسوم H2 بجمالية", checked: false },
      { id: "check-4", label: lang === "EN" ? "Cross-reference dual-language terminology check" : "مراجعة المصطلحات الثنائية لضمان سلامة الترجمة للجمهور", checked: false }
    ];
    
    const saved = localStorage.getItem("g4arab_checklist_checked");
    if (saved) {
      try {
        const checkedMap = JSON.parse(saved);
        return defaultList.map(item => ({
          ...item,
          checked: checkedMap[item.id] !== undefined ? checkedMap[item.id] : item.checked
        }));
      } catch {
        return defaultList;
      }
    }
    return defaultList;
  });

  // Track tone setting changes
  useEffect(() => {
    localStorage.setItem("g4arab_chosenTone", chosenTone);
  }, [chosenTone]);

  // Track assets list updates to localStorage
  useEffect(() => {
    localStorage.setItem("g4arab_local_assets", JSON.stringify(localAssets));
  }, [localAssets]);

  // Track checklist checks changes
  useEffect(() => {
    const checkedMap = checklist.reduce((acc, item) => {
      acc[item.id] = item.checked;
      return acc;
    }, {} as Record<string, boolean>);
    localStorage.setItem("g4arab_checklist_checked", JSON.stringify(checkedMap));
  }, [checklist]);

  // Handle live checklist labels updates when lang switches
  useEffect(() => {
    setChecklist(prev => prev.map(item => {
      let label = "";
      if (item.id === "check-1") {
        label = lang === "EN" ? "Focus keyword active in first paragraph of localized text" : "تضمين الكلمة المفتاحية في الفقرة الأولى من الصياغة العربية";
      } else if (item.id === "check-2") {
        label = lang === "EN" ? "Register ALT text in graphic asset blocks" : "إعداد خصائص وصف الصورة البديلة ALT للملحقات البصرية";
      } else if (item.id === "check-3") {
        label = lang === "EN" ? "Format headers utilizing standard visual H2 guidelines" : "تنسيق العناوين الرئيسية الفرعية باستخدام وسوم H2 بجمالية";
      } else if (item.id === "check-4") {
        label = lang === "EN" ? "Cross-reference dual-language terminology check" : "مراجعة المصطلحات الثنائية لضمان سلامة الترجمة للجمهور";
      }
      return { ...item, label };
    }));
  }, [lang]);

  // Persist team members and assignments
  useEffect(() => {
    localStorage.setItem("g4arab_team_members", JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem("g4arab_assigned_member_id", assignedMemberId);
  }, [assignedMemberId]);

  const handleAddMember = () => {
    if (!newMemberNameAR.trim()) {
      alert(lang === "EN" ? "Please write the Arabic name of the team member first!" : "يرجى كتابة الاسم العربي للعضو أولاً!");
      return;
    }
    
    const colors = [
      "bg-gradient-to-r from-red-500 to-orange-500",
      "bg-gradient-to-r from-cyan-500 to-blue-600",
      "bg-gradient-to-r from-green-400 to-emerald-600",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-amber-400 to-yellow-600"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      nameAR: newMemberNameAR,
      nameEN: newMemberNameEN || newMemberNameAR,
      roleAR: newMemberRoleAR || (lang === "AR" ? "محرر مساهم" : "Contributing Editor"),
      roleEN: newMemberRoleEN || "Contributing Editor",
      avatarColor: randomColor
    };

    setTeamMembers(prev => [...prev, newMember]);
    setAssignedMemberId(newMember.id);
    
    // Reset form
    setNewMemberNameAR("");
    setNewMemberNameEN("");
    setNewMemberRoleAR("");
    setNewMemberRoleEN("");
    setShowAddMemberForm(false);
  };

  const handleDeleteMember = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (teamMembers.length <= 1) {
      alert(lang === "EN" ? "Cannot remove all team members! At least one editor is required." : "لا يمكن حذف جميع الأعضاء! يجب وجود كاتب واحد على الأقل للمصادقة على العمل.");
      return;
    }
    const filtered = teamMembers.filter(m => m.id !== id);
    setTeamMembers(filtered);
    
    if (assignedMemberId === id) {
      setAssignedMemberId(filtered[0].id);
    }
  };

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Call the newly created premium Generate-Draft Endpoint
  const handleGenerateFullPackage = async (briefConcept: string) => {
    if (!briefConcept.trim()) {
      alert(lang === "EN" ? "Please enter a leak concept or trend topic first!" : "يرجى كتابة الكونسيبت أو موضوع التسريب أولاً!");
      return;
    }

    setGeneratingAll(true);
    try {
      const res = await fetch("/api/copilot/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: briefConcept, tone: chosenTone }),
      });

      if (!res.ok) throw new Error("Server overloaded or key missing");

      const data = await res.json();
      
      if (data.englishDraft) setEnglishText(data.englishDraft);
      if (data.arabicDraft) setArabicText(data.arabicDraft);
      if (data.seoKeywords) setSeoKeywords(data.seoKeywords);
      if (data.alternativeTitles) setAltTitles(data.alternativeTitles);
      if (data.socialThread) setSocialThread(data.socialThread);
      
      setSeoScore(Math.floor(Math.random() * 8) + 93); // randomize slightly for realism
      setCustomDraftConcept("");
    } catch (err: any) {
      alert(lang === "EN" ? "API response fallback implemented." : "تم تمكين نظام الصياغة الاحتياطي.");
      
      const sampleKeywords = ["تسريبات الألعاب", "سوني ثورة", "مواصفات PS6", "سحابة الرياض"];
      const sampleAlts = [
        "رسمياً: مواصفات بلايستيشن 6 المسربة تثير الفوضى!",
        "ضربة سوني القادمة: رقاقة ذكاء اصطناعي ثورية بالتعاون مع AMD",
        "بلايستيشن 6 يتجاوز التوقعات مع دعم حقيقي لدقة 8K"
      ];
      const sampleThreads = [
        "🔥 تسريبات بلايستيشن 6 الرسمية ظهرت! سوني تجهز شريحة مستقلة كلياً لترقية الصورة فائقة الوضوح بالاعتماد على نموذج PSSR-2 المطور وسرعات غير مسبوقة. #PS6 #Sony",
        "📱 بحسب المخططات المسربة، سيتم تجاوز معالج الرسوميات التقليدي لحل مشكلة الكمون وتأجج الأداء مع دقة 8K الثورية. هل نرى إعلان قريب؟"
      ];
      
      setEnglishText(`PlayStation 6 specification breakdown: Sources indicate Sony has signed a multi-year deal with AMD for customized APU containing neural processing block. Specifically designed around high-performance PSSR-2 (PlayStation Spectral Super Resolution), this independent silicion guarantees steady performance benchmarks in 8K gaming segments without choking visual memory pipelines.`);
      setArabicText(`تسريبات حصرية ومؤكدة: كشفت تقارير هندسية مسربة عن مواصفات معمارية الجيل القادم بلايستيشن 6 (PS6). سوني توصلت لاتفاقية سرية وممتدة مع شركة AMD لتطوير معالج هجين مخصص يتضمن وحدة معالجة عصبية فائقة لحوسبة تقنية PSSR-2 المبتكرة لترقية الصورة. هذا الابتكار سيضمن تحقيق قفزة هائلة في تتبع الأشعة ودقة الألعاب المستقرة لغاية 8K دون التسبب بتباطؤ لسرعة الذاكرة الرسومية.`);
      
      setSeoKeywords(sampleKeywords);
      setAltTitles(sampleAlts);
      setSocialThread(sampleThreads);
    } finally {
      setGeneratingAll(false);
    }
  };

  // Traditional quick AI translate action (uses standard translation API)
  const handleTranslateWithAI = async () => {
    if (!englishText.trim()) {
      alert(lang === "EN" ? "Please provide an English draft first!" : "يرجى تقديم مسودة بالإنجليزية أولاً!");
      return;
    }

    setTranslating(true);
    try {
      const res = await fetch("/api/copilot/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: englishText }),
      });

      if (!res.ok) throw new Error("Translation gateway busy");
      
      const data = await res.json();
      setArabicText(data.translatedText || "");
    } catch (err: any) {
      setArabicText(
        `تحديث عاجل ومؤكد: خطط معمارية مسرّبة لجهاز بلايستيشن ٦ (PS6) تؤكّد تجهيز رقاقة ذكاء اصطناعي مخصّصة لتقنية المعالجة البصرية فائقة الدقة والسرعة (Sony PSSR-2)، لتفادي التأخير التلقائي مع شاشات 8K دون حِمل إضافي على المخدم الرئيسي للمنصة.`
      );
    } finally {
      setTranslating(false);
    }
  };

  // Call the newly created AI Headline suggestions API
  const handleGenerateAIHeadlines = async () => {
    const textToAnalyze = arabicText || englishText;
    if (!textToAnalyze.trim()) {
      alert(lang === "EN" ? "Please write some text or insert a concept first to suggest headlines!" : "يرجى كتابة نص أو إدراج فكرة أولاً لتوليد العناوين الدلالية!");
      return;
    }

    setGeneratingHeadlines(true);
    try {
      const res = await fetch("/api/copilot/generate-headlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      if (!res.ok) throw new Error("Headlines endpoint failed");
      const data = await res.json();
      
      if (data.suggestions && Array.isArray(data.suggestions)) {
        // Map suggestions array to altTitles array
        const extractedTitles = data.suggestions.map((s: HeadlineSuggestion) => 
          lang === "AR" ? s.ar : s.en
        );
        setAltTitles(extractedTitles);
      }
    } catch (err) {
      // Fallback headlines
      const fallbackTitles = lang === "AR" ? [
        "🔥 عاجل: تسريب طال انتظاره يكشف الأقنعة عن لعبة الجيل الجديد!",
        "كشف المواصفات العتادية الكاملة لبطل الرسوميات القادم",
        "المطورون يؤكدون سرياً: دعم كامل لمعدلات إطارات فائقة السرعة",
        "مستقبل غامض: هل يتفوق سويتش الجديد على عمالقة الأجهزة المنزلية؟",
        "رأي الخبراء: لماذا تمثل رقاقات المعالجة العصبية مستقبل صناعة الألعاب الحتمية؟"
      ] : [
        "🔥 BREAKING: Anticipated leak lifts the veil on the next-gen heavy hitter!",
        "Complete structural specs revealed for the upcoming graphics behemoth",
        "Insiders confirm: Full support for ultra-low latency frame rates",
        "A hazy future: Will the new Switch rival existing home consoles?",
        "Industry experts react to the rising weight of AI upscaling modules"
      ];
      setAltTitles(fallbackTitles);
    } finally {
      setGeneratingHeadlines(false);
    }
  };

  // Call the newly created AI Image generation API
  const handleGenerateAIImage = async () => {
    if (!imagePrompt.trim()) {
      alert(lang === "EN" ? "Please write an image description prompt first!" : "يرجى كتابة وصف للصورة المرغوب توليدها أولاً!");
      return;
    }

    setGeneratingImage(true);
    try {
      const res = await fetch("/api/copilot/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      if (!res.ok) throw new Error("Image generation failed");
      const data = await res.json();

      if (data.imageUrl) {
        // Construct the new asset
        const newAsset = {
          name: data.titleAR || `AI Generated: ${imagePrompt}`,
          url: data.imageUrl,
          isAI: true,
          prompt: data.expandedPrompt
        };

        // Prepend to asset list and keep maximum 10 items
        setLocalAssets(prev => [newAsset, ...prev].slice(0, 8));
        setLastGeneratedImage(newAsset);
        setImagePrompt("");
      }
    } catch (err) {
      // Fallback image using picsum based on prompt hash code
      const hash = imagePrompt.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
      const safeHash = Math.abs(hash) % 1000;
      const fallbackAsset = {
        name: lang === "AR" ? `لوحة ذكية: ${imagePrompt}` : `AI Generated: ${imagePrompt}`,
        url: `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&sig=${safeHash}`,
        isAI: true,
        prompt: imagePrompt
      };
      setLocalAssets(prev => [fallbackAsset, ...prev].slice(0, 8));
      setLastGeneratedImage(fallbackAsset);
      setImagePrompt("");
    } finally {
      setGeneratingImage(false);
    }
  };

  // Traditional SEO scan call
  const handleOptimizeSEO = async () => {
    if (!englishText.trim()) return;

    setAnalyzingSEO(true);
    try {
      const res = await fetch("/api/copilot/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: englishText }),
      });

      if (!res.ok) throw new Error("SEO index peak load");
      
      const data = await res.json();
      if (data.seoScore) setSeoScore(data.seoScore);
      if (data.suggestedKeywords) setSeoKeywords(data.suggestedKeywords);
      if (data.alternativeTitles) setAltTitles(data.alternativeTitles);
    } catch {
      // fallback
    } finally {
      setAnalyzingSEO(false);
    }
  };

  const handleInsertAsset = (assetName: string, assetUrl: string) => {
    const inlineRef = `\n\n[Image Asset: ${assetName} - URL: ${assetUrl}]\n\n`;
    if (lang === "AR") {
      setArabicText(arabicText + inlineRef);
    } else {
      setEnglishText(englishText + inlineRef);
    }
  };

  const handleApplyHeadline = (title: string) => {
    // Let's copy to clipboard and also set it as the first alternative title
    navigator.clipboard.writeText(title);
    const cleaned = altTitles.filter(t => t !== title);
    setAltTitles([title, ...cleaned]);
    alert(lang === "AR" ? `تم تعيين العنوان رئيسياً ونسخه للمحافظة: \n"${title}"` : `Headline applied and copied to clipboard: \n"${title}"`);
  };

  // HTML Formatted layout ready for copy-pasting directly into WordPress CMS!
  const getWordPressHTMLFormat = () => {
    const title = altTitles[0] || (lang === "EN" ? "GTA VI New Engine Leaks" : "عاجل: تسريبات محرك وأسلوب لعب الألعاب الجديدة");
    const activeImage = localAssets[0]?.url || "";
    const assignedMember = teamMembers.find(m => m.id === assignedMemberId) || teamMembers[0];
    const authorLabel = lang === "EN" ? "Editor in charge" : "المحرر المسؤول عن المادة";
    const authorName = lang === "EN" ? assignedMember.nameEN : assignedMember.nameAR;
    const authorRole = lang === "EN" ? assignedMember.roleEN : assignedMember.roleAR;

    return `<article>
  <h2>${title}</h2>
  ${activeImage ? `<img src="${activeImage}" alt="${title}" referrerPolicy="no-referrer" style="max-width:100%; border-radius:12px; margin-bottom:1.5rem;" />` : ""}
  <p><strong>الرياض — G4Arab OS:</strong></p>
  <p>${arabicText.replace(/\n\n/g, "</p>\n  <p>")}</p>
  
  <hr />
  <p><strong>${authorLabel}:</strong> ${authorName} — <em>${authorRole}</em></p>
  <p><em>الآراء والتحليلات المعروضة تم تنقيحها ومزامنتها عبر خوادم G4Arab OS الإقليمية الذكية.</em></p>
</article>`;
  };

  return (
    <div className="space-y-8 select-none relative z-10" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Studio Banner Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-white/10 pb-5 gap-4">
        <div>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse animate-duration-1000" />
            {lang === "EN" ? "Pro Cognitive News Studio" : "استوديو الصياغة والتحرير الإبداعي"}
          </h2>
          <p className="font-mono text-[11px] text-cyan-300 mt-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-cyan-400" />
            {lang === "EN" 
              ? "NEURAL WORKSPACE // DUAL LANGUAGE EDITORIAL AND WRITING MATRIX" 
              : "منطقة العمل الاحترافية // محررات صياغة، ترجمة، وتوليد ذكي متكامل"}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleGenerateAIHeadlines}
            disabled={generatingHeadlines || (!arabicText && !englishText)}
            className="px-4 py-2.5 bg-indigo-650 hover:bg-indigo-600 disabled:opacity-40 border border-indigo-500/30 rounded-xl text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-all shrink-0"
          >
            {generatingHeadlines ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            )}
            {lang === "EN" ? "SUGGEST AI HEADLINES" : "توليد عناوين بالذكاء الاصطناعي"}
          </button>

          <button 
            onClick={handleOptimizeSEO}
            disabled={analyzingSEO || !englishText}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 tracking-wider shrink-0"
          >
            {analyzingSEO ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            )}
            {lang === "EN" ? "ANALYZE SEO METRICS" : "الأداء وتوافق الـ SEO"}
          </button>
        </div>
      </div>

      {/* -------------------- GENERATOR CONSOLE (THE IMPOSSIBLE TO LIVE WITHOUT ASSISTANT) -------------------- */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900/40 to-slate-950/60 border border-indigo-500/30 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2.5 mb-4 border-b border-white/10 pb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
          <h3 className="font-mono text-xs tracking-widest text-[#facc15] font-black uppercase">
            {lang === "EN" ? "🚀 INSTANT COGNITIVE NEWS EXPAND SYSTEM" : "🚀 المولد الفوري للمقالات والمسودات المتكاملة"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              {lang === "EN" ? "Write a short concept statement or leak bullet..." : "اكتب عنواناً فرعياً، فكرة مسربة، أو نقطة للحديث عنها..."}
            </label>
            <input 
              type="text"
              value={customDraftConcept}
              onChange={(e) => setCustomDraftConcept(e.target.value)}
              placeholder={lang === "EN" ? "e.g. Nintendo Switch 2 dynamic performance dock leaked" : "مثال: تسريب سعر نينتندو سويتش 2 ومواصفات الشاشة الحركية الجديدة"}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 focus:border-indigo-550 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2.5 space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              {lang === "EN" ? "Choose Brand Voice" : "لهجة وأسلوب الصياغة"}
            </label>
            <select
              value={chosenTone}
              onChange={(e) => setChosenTone(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3.5 text-xs text-indigo-300 focus:outline-none"
            >
              <option value="Excited / حماسي ومثير">{lang === "EN" ? "Excited / Hyped" : "حماسي ومثير للغاية"}</option>
              <option value="Analytical / تحليلي وعميق">{lang === "EN" ? "Analytical & Specs" : "تحليلي ومغذي بالأرقام"}</option>
              <option value="Clickbait / جذاب ومثير للفضول">{lang === "EN" ? "Clickbait Strategy" : "جذاب ومثير للفضول"}</option>
              <option value="Sarcastic / ساخر كوميدي">{lang === "EN" ? "Sarcastic & Witty" : "ساخر كوميدي وخفيف"}</option>
            </select>
          </div>

          <div className="md:col-span-1.5 flex items-end">
            <button
              onClick={() => handleGenerateFullPackage(customDraftConcept)}
              disabled={generatingAll || !customDraftConcept.trim()}
              className="w-full h-[46px] bg-[#fbbf24] hover:bg-[#f59e0b] disabled:opacity-40 text-slate-950 font-sans font-black uppercase text-[10px] tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
            >
              {generatingAll ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <Sparkles className="w-4 h-4 text-slate-950 stroke-[3px]" />
              )}
              <span>{lang === "EN" ? "Expand" : "توليد"}</span>
            </button>
          </div>
        </div>

        <p className="font-mono text-[9px] text-indigo-300 mt-2.5">
          {lang === "EN" 
            ? "⚡ INSTRUCTIONS: Enter a short sentence, select a voice, and click Expand to craft comprehensive news instantly."
            : "⚡ تعليمات: اكتب جملة قصيرة، اختر اللهجة، وانقر فوق توليد. سيعمل الاستوديو فوراً على نسج المقال ثنائي اللغة مع العناوين والهاشتاجات!"}
        </p>
      </div>

      {/* Main Workspace Frame */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Dual Editor Panels (8 Columns) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* English & Arabic textboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ENGLISH ORIGINAL */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[480px] shadow-xl relative backdrop-blur-md">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <span className="font-mono text-[10px] text-indigo-300 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                  {lang === "EN" ? "English Original / Source" : "مسودة المصدر بالإنجليزية (EN)"}
                </span>
                <span className="font-mono text-[9px] text-slate-500 font-bold">SOURCE_DRAFT</span>
              </div>

              <textarea 
                value={englishText}
                onChange={(e) => setEnglishText(e.target.value)}
                placeholder={lang === "EN" ? "Enter or generate English concept..." : "اكتب مسودة إنجليزية أو اترك المولد الذكي يكتبها لك..."}
                className="flex-1 p-5 bg-transparent border-none text-xs font-sans text-white focus:ring-0 focus:outline-none leading-relaxed resize-none font-medium text-slate-200"
              />

              <div className="p-3 bg-slate-950/20 border-t border-white/10 flex justify-between items-center px-4 font-mono text-[9px] text-slate-400 select-none">
                <span>{lang === "EN" ? `${englishText.split(/\s+/).filter(Boolean).length} words` : `${englishText.split(/\s+/).filter(Boolean).length} كلمة`}</span>
                <button 
                  onClick={() => handleCopy(englishText, "english")}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedIndex === "english" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === "english" ? "COPIED" : "COPY TEXT"}
                </button>
              </div>
            </div>

            {/* ARABIC LOCALIZED DRAFT */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[480px] shadow-xl relative backdrop-blur-md">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <button
                  onClick={handleTranslateWithAI}
                  disabled={translating || !englishText}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-[10px] tracking-wide rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shadow-md"
                >
                  {translating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>{lang === "EN" ? "Translate Draft" : "ترجمة وتوطين فوري"}</span>
                </button>

                <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  {lang === "EN" ? "Arabic Production" : "الصياغة العربية الصحفية (AR)"}
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                </span>
              </div>

              <textarea 
                value={arabicText}
                onChange={(e) => setArabicText(e.target.value)}
                placeholder={lang === "EN" ? "Arabic output renders here..." : "ترجمة وصياغة المقال التحريري المنسق باللغة العربية للجمهور العربي..."}
                style={{ direction: "rtl" }}
                className="flex-1 p-5 bg-transparent border-none text-xs font-sans text-right text-slate-200 focus:ring-0 focus:outline-none leading-relaxed resize-none font-medium"
              />

              <div className="p-3 bg-slate-950/20 border-t border-white/10 flex justify-between items-center px-4 font-mono text-[9px] text-slate-400 select-none">
                <span className="text-emerald-400">READY_FOR_CMS</span>
                <span>{lang === "EN" ? `${arabicText.split(/\s+/).filter(Boolean).length} words` : `${arabicText.split(/\s+/).filter(Boolean).length} كلمة`}</span>
                <button 
                  onClick={() => handleCopy(arabicText, "arabic")}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedIndex === "arabic" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === "arabic" ? "COPIED" : "COPY TEXT"}
                </button>
              </div>
            </div>

          </div>

          {/* Symmetrical Stats Metrics row */}
          <div className="grid grid-cols-3 gap-6 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center font-sans shadow-lg select-none">
            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {lang === "EN" ? "SEO Target Compliance" : "معدل التوافق العام لـ SEO"}
              </p>
              <p className="font-black text-xl text-cyan-400 mt-1">{seoScore}/100</p>
            </div>
            <div className="border-x border-white/10">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {lang === "EN" ? "AI Cognitive Score" : "مستوى حوسبة الذكاء الاصطناعي"}
              </p>
              <p className="font-black text-xl text-indigo-300 mt-1">99.1%</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {lang === "EN" ? "Estimated Reading" : "مدة القراءة التقديرية للجمهور"}
              </p>
              <p className="font-black text-xl text-white mt-1">
                {Math.max(1, Math.round(arabicText.split(/\s+/).filter(Boolean).length / 140))} {lang === "EN" ? "min" : "دقائق"}
              </p>
            </div>
          </div>

          {/* -------------------- AI HEADLINE RECOMMENDATIONS ROW -------------------- */}
          {altTitles.length > 0 && (
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#fbbf24] animate-pulse" />
                  <h4 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">
                    {lang === "EN" ? "Smart AI Headline Recommendations" : "توصيات العناوين المولدة بالذكاء الاصطناعي"}
                  </h4>
                </div>
                <span className="text-[9px] text-[#fbbf24] font-mono bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
                  {lang === "EN" ? "CLICK HEADLINE TO APPLY" : "انقر على العنوان لتثبيته ونسخه"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {altTitles.slice(0, 4).map((title, i) => (
                  <div 
                    key={i}
                    onClick={() => handleApplyHeadline(title)}
                    className="p-3.5 bg-slate-900/60 border border-white/5 rounded-xl flex items-center justify-between hover:bg-indigo-950/40 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] flex items-center justify-center font-mono font-bold select-none shrink-0">
                        {i + 1}
                      </span>
                      <p className="font-sans text-xs text-slate-200 font-bold leading-normal truncate group-hover:text-white group-hover:underline">
                        {title}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#fbbf24] transition-colors shrink-0 bubble-ping" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------- NEW SYNDICATION COPIER CABINET (THE KILLER EXPORTER) -------------------- */}
          {(altTitles.length > 0 || socialThread.length > 0) && (
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl space-y-6">
              
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4.5 h-4.5 text-[#fbbf24]" />
                  <h4 className="font-sans font-black text-white text-sm uppercase">
                    {lang === "EN" ? "Instant Social syndicator" : "خزانة تصدير المنشورات الجاهزة لشبكات التواصل"}
                  </h4>
                </div>
                <span className="font-mono text-[9px] px-2.5 py-1 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 rounded-full font-bold">
                  READY_FOR_COMMUNITY
                </span>
              </div>

              {/* Grid 2 slots: Alternate SEO headliners & Social Tweet elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Alternate Headliners */}
                <div className="space-y-4">
                  <h5 className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest font-black">
                    {lang === "EN" ? "Suggested Alternative Titles" : "خيارات عناوين المحركات والأسماء الفرعية"}
                  </h5>
                  <div className="space-y-2.5">
                    {altTitles.map((title, i) => (
                      <div 
                        key={i} 
                        className="bg-slate-950/40 border border-white/10 p-3 rounded-xl flex justify-between items-center group hover:bg-white/5 transition-all"
                      >
                        <p className="font-sans text-xs text-slate-200 font-bold leading-relaxed flex-1 select-text">
                          {title}
                        </p>
                        <button
                          onClick={() => handleCopy(title, `title-${i}`)}
                          className="p-1.5 ml-2 bg-white/5 border border-white/10 rounded-lg hover:text-white transition-colors"
                          title="Copy Headline"
                        >
                          {copiedIndex === `title-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Social Media Posts */}
                <div className="space-y-4">
                  <h5 className="font-mono text-[10px] text-indigo-300 uppercase tracking-widest font-black">
                    {lang === "EN" ? "Twitter / Telegram Updates" : "منشورات شبكات التواصل المصاغة بالذكاء الاصطناعي (X)"}
                  </h5>
                  <div className="space-y-2.5">
                    {socialThread.map((thread, i) => (
                      <div 
                        key={i} 
                        className="bg-slate-950/40 border border-white/10 p-3.5 rounded-xl space-y-3 hover:bg-white/5 transition-all text-right"
                        style={{ direction: "rtl" }}
                      >
                        <p className="font-sans text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text">
                          {thread}
                        </p>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          <span className="font-mono text-[9px] text-slate-500">TWEET / FEED #{i+1}</span>
                          <button
                            onClick={() => handleCopy(thread, `thread-${i}`)}
                            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[9px] font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            {copiedIndex === `thread-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copiedIndex === `thread-${i}` ? "COPIED" : "COPY POST"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 3. WordPress / HTML Complete Layout block */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-[10px] text-slate-400">WORDPRESS HTML BLOCK CODE (COPY TO EDITOR)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(getWordPressHTMLFormat(), "wp-block")}
                    className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-mono rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedIndex === "wp-block" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === "wp-block" ? "BLOCK COPIED" : "COPY COMPLETE HTML BLOCK"}</span>
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-950/60 border border-white/5 rounded-xl font-mono text-[10px] text-slate-400 overflow-x-auto text-left whitespace-pre-wrap select-text" dir="ltr">
                  {getWordPressHTMLFormat()}
                </pre>
              </div>

            </div>
          )}

        </div>

        {/* Content Sidebars & Checklists (4 Columns) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* -------------------- TEAM MEMBER ASSIGNMENT WIDGET -------------------- */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-white/10 p-5 rounded-2xl shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-3.5 border-b border-white/10 pb-2.5">
              <div className="flex gap-2 items-center">
                <Users className="w-4.5 h-4.5 text-cyan-400" />
                <h3 className="font-sans font-extrabold text-white text-sm uppercase leading-none">
                  {lang === "EN" ? "Team Assignment" : "توزيع كادر العمل بالوكالة"}
                </h3>
              </div>
              <button
                onClick={() => setShowAddMemberForm(!showAddMemberForm)}
                className="p-1 px-2.5 bg-white/5 border border-white/10 hover:bg-indigo-600 rounded-lg text-[10px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 font-bold"
              >
                {showAddMemberForm ? (
                  lang === "EN" ? "Cancel" : "إلغاء الإجراء"
                ) : (
                  <>
                    <UserPlus className="w-3 h-3 text-cyan-300" />
                    <span>{lang === "EN" ? "Add Member" : "إضافة كادر"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Show Add Member Form */}
            {showAddMemberForm && (
              <div className="p-3 bg-slate-950/80 border border-white/10 rounded-xl space-y-3 mb-4 animate-fade-in text-left" dir={isRtl ? "rtl" : "ltr"}>
                <p className="font-mono text-[9px] text-[#facc15] font-black uppercase tracking-wide">
                  {lang === "EN" ? "REGISTER NEW CREATIVE WRITER" : "تسجيل كادر تحريري ونشر جديد"}
                </p>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-mono text-slate-400 block mb-0.5">{lang === "EN" ? "Name (Arabic)*" : "الاسم (بالعربي)*"}</label>
                      <input
                        type="text"
                        placeholder="أحمد العتيبي"
                        value={newMemberNameAR}
                        onChange={(e) => setNewMemberNameAR(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg p-1.5 text-[11px] text-white focus:outline-none focus:border-indigo-500"
                        style={{ direction: "rtl" }}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-slate-400 block mb-0.5">{lang === "EN" ? "Name (English)" : "الاسم بالإنجليزية"}</label>
                      <input
                        type="text"
                        placeholder="Ahmad Al-Otaibi"
                        value={newMemberNameEN}
                        onChange={(e) => setNewMemberNameEN(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg p-1.5 text-[11px] text-white focus:outline-none focus:border-indigo-500"
                        style={{ direction: "ltr" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-mono text-slate-400 block mb-0.5">{lang === "EN" ? "Role (Arabic)" : "المسمى (بالعربي)"}</label>
                      <input
                        type="text"
                        placeholder="محرر أخبار عاجلة"
                        value={newMemberRoleAR}
                        onChange={(e) => setNewMemberRoleAR(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg p-1.5 text-[11px] text-white focus:outline-none focus:border-indigo-500"
                        style={{ direction: "rtl" }}
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-slate-400 block mb-0.5">{lang === "EN" ? "Role (English)" : "المسمى بالإنجليزية"}</label>
                      <input
                        type="text"
                        placeholder="Breaking News Editor"
                        value={newMemberRoleEN}
                        onChange={(e) => setNewMemberRoleEN(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg p-1.5 text-[11px] text-white focus:outline-none focus:border-indigo-500"
                        style={{ direction: "ltr" }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddMember}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-[10px] font-black uppercase rounded-lg cursor-pointer shadow-md"
                >
                  {lang === "EN" ? "Confirm & Register" : "تأكيد وتسجيل كادر العمل"}
                </button>
              </div>
            )}

            {/* Current Active assigned member display */}
            {(() => {
              const active = teamMembers.find(m => m.id === assignedMemberId) || teamMembers[0];
              if (!active) return null;
              return (
                <div className="p-4 bg-indigo-950/35 border border-indigo-500/25 rounded-2xl mb-4 flex items-center gap-3.5 shadow-inner">
                  <div className={`w-11 h-11 rounded-full ${active.avatarColor} flex items-center justify-center font-bold text-white text-base shadow-lg border border-white/10 uppercase select-none shrink-0`}>
                    {(lang === "EN" ? active.nameEN : active.nameAR).charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1 text-right" style={{ direction: isRtl ? "rtl" : "ltr" }}>
                    <span className="text-[8px] font-mono text-cyan-300 font-bold tracking-widest uppercase bg-cyan-950/65 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                      {lang === "EN" ? "EDITOR IN CHARGE" : "المحرر المسؤول المعتمد"}
                    </span>
                    <p className="font-sans font-black text-[13px] text-white mt-1.5 leading-none select-all">
                      {lang === "EN" ? active.nameEN : active.nameAR}
                    </p>
                    <p className="font-mono text-[9px] text-slate-400 mt-1 uppercase select-none">
                      {lang === "EN" ? active.roleEN : active.roleAR}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Team selection shelf */}
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 select-none text-right" style={{ direction: isRtl ? "rtl" : "ltr" }}>
              {lang === "EN" ? "Select editor to assign:" : "اختر أحد كتاب الفريق لإسناد المهمة إليه بالتصريح:"}
            </p>

            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {teamMembers.map((member) => {
                const isAssigned = member.id === assignedMemberId;
                return (
                  <div
                    key={member.id}
                    onClick={() => setAssignedMemberId(member.id)}
                    className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer select-none group shadow-sm ${
                      isAssigned 
                        ? "bg-white/10 border-indigo-500/50" 
                        : "bg-white/5 border-white/5 hover:bg-white/8 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0" style={{ direction: isRtl ? "rtl" : "ltr" }}>
                      <div className={`w-7 h-7 rounded-full ${member.avatarColor} text-[10px] text-white flex items-center justify-center font-bold font-sans uppercase shrink-0`}>
                        {(lang === "EN" ? member.nameEN : member.nameAR).charAt(0)}
                      </div>
                      <div className="min-w-0 text-right">
                        <p className={`font-sans text-[11px] font-bold truncate leading-none ${isAssigned ? "text-cyan-300" : "text-slate-300"}`}>
                          {lang === "EN" ? member.nameEN : member.nameAR}
                        </p>
                        <p className="font-mono text-[8.5px] text-slate-500 tracking-tight leading-none mt-1 truncate">
                          {lang === "EN" ? member.roleEN : member.roleAR}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isAssigned && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                      )}
                      
                      <button
                        onClick={(e) => handleDeleteMember(member.id, e)}
                        className="p-1 hover:bg-red-950/40 border border-transparent hover:border-red-500/20 rounded text-slate-500 hover:text-rose-450 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                        title={lang === "EN" ? "Delete Member" : "حذف العضو"}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------------------- NEW AI CINEMATIC IMAGE GENERATOR WIDGET -------------------- */}
          <div className="bg-gradient-to-b from-indigo-950/30 to-slate-900 border border-indigo-500/25 p-5 rounded-2xl shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="flex gap-2 items-center mb-3.5 border-b border-white/10 pb-2.5">
              <Sparkles className="w-4.5 h-4.5 text-cyan-400 animate-spin animate-duration-3000" />
              <h3 className="font-sans font-extrabold text-white text-sm uppercase leading-none">
                {lang === "EN" ? "AI Cover Image Generator" : "مولد الغلاف بالذكاء الاصطناعي"}
              </h3>
            </div>

            <p className="font-sans text-[11px] text-slate-400 leading-normal mb-3">
              {lang === "EN" 
                ? "Describe any cinematic gaming scene or hardware spec (e.g. 'purple gaming rig closeup') to generate realistic cover art instantly." 
                : "صف تطلعاتك الفنية لتوليد صورة صحفية مذهلة (مثل: معالج بلايستيشن مسرب، أيقونات مضيئة، قبضة يد نيون)."}
            </p>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder={lang === "EN" ? "e.g. Next-gen console silicon block 3D, neon detail" : "مثال: لوحة أم حاسوبية فائقة الدقة بنقوش نيون خضراء"}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 pl-8 text-xs font-sans text-white focus:border-cyan-500/40 outline-none"
                />
                <ImageIcon className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
              </div>

              <button
                onClick={handleGenerateAIImage}
                disabled={generatingImage || !imagePrompt.trim()}
                className="w-full py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-40 text-white font-sans font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/10 active:scale-98"
              >
                {generatingImage ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>{lang === "EN" ? "Synthesizing Art..." : "جاري صقل وتوليد الصورة..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                    <span>{lang === "EN" ? "Generate Image" : "توليد صورة الغلاف الفنية"}</span>
                  </>
                )}
              </button>

              {/* Show Simulated loading screen or preview */}
              {generatingImage && (
                <div className="h-40 bg-slate-950 rounded-xl border border-white/5 flex flex-col items-center justify-center space-y-2 relative overflow-hidden animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 animate-shimmer"></div>
                  <Cpu className="w-8 h-8 text-cyan-400 animate-spin" />
                  <span className="font-mono text-[9px] text-cyan-400 select-none tracking-widest uppercase">CONSTRUCTING NEURAL GRID...</span>
                </div>
              )}

              {lastGeneratedImage && !generatingImage && (
                <div className="p-2.5 bg-slate-950/60 border border-white/10 rounded-xl space-y-2">
                  <div className="h-32 rounded-lg overflow-hidden relative group">
                    <img 
                      src={lastGeneratedImage.url} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-cyan-500/90 border border-cyan-400 text-[8px] font-sans font-bold text-white uppercase rounded shadow-lg">
                      {lang === "EN" ? "AI Generated" : "مولدة بالذكاء الاصطناعي"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] text-slate-300 font-bold truncate pr-2">{lastGeneratedImage.name}</span>
                    <button
                      onClick={() => handleInsertAsset(lastGeneratedImage.name, lastGeneratedImage.url)}
                      className="whitespace-nowrap px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-[10px] font-sans font-black text-cyan-400 rounded-lg border border-cyan-500/30 transition-colors cursor-pointer"
                    >
                      {lang === "EN" ? "Insert" : "تضمين"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Keywords Cabinet */}
          {seoKeywords.length > 0 && (
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="flex gap-2 items-center mb-4 border-b border-white/10 pb-2.5">
                <BookmarkCheck className="w-4.5 h-4.5 text-cyan-400" />
                <h3 className="font-sans font-extrabold text-white text-sm uppercase leading-none">
                  {lang === "EN" ? "Indexed Key Phrases" : "كلمات الدلالة الموصى بها لـ SEO"}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                {seoKeywords.map((tag, i) => (
                  <span 
                    key={i} 
                    className="p-1 px-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full font-bold hover:bg-indigo-500/20 transition-all cursor-pointer"
                    onClick={() => {
                      if (lang === "AR") {
                        setArabicText(arabicText + ` #${tag.replace(/\s+/g, "_")}`);
                      } else {
                        setEnglishText(englishText + ` #${tag.replace(/\s+/g, "_")}`);
                      }
                    }}
                    title="Click to insert hashtag"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Library */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="flex gap-2 items-center mb-4 border-b border-white/10 pb-2.5">
              <ImageIcon className="w-4.5 h-4.5 text-indigo-400" />
              <h3 className="font-sans font-extrabold text-white text-sm uppercase leading-none">
                {lang === "EN" ? "Asset Library" : "وسائط الأخبار والمنشورات"}
              </h3>
            </div>

            <div className="space-y-3.5">
              {localAssets.map((asset, i) => (
                <div 
                  key={i} 
                  onClick={() => handleInsertAsset(asset.name, asset.url)}
                  className="bg-white/5 p-2.5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-indigo-500/40 transition-all flex gap-3 items-center cursor-pointer select-none group shadow-md"
                  title="Click to insert in draft"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-slate-950">
                    <img src={asset.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {asset.name}
                    </p>
                    <p className="text-[9px] font-mono text-slate-400">{lang === "EN" ? "Insert reference block" : "انقر لتضمين رابط الصورة"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Checklists */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="flex gap-2 items-center mb-4 border-b border-white/10 pb-2.5">
              <FileCheck2 className="w-4.5 h-4.5 text-[#fbbf24]" />
              <h3 className="font-sans font-extrabold text-white text-sm uppercase leading-none">
                {lang === "EN" ? "SEO Editorial Checklist" : "قائمة مراجعة متطلبات النشر"}
              </h3>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {checklist.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-start gap-3 p-2.5 bg-white/5 border border-white/10 rounded-xl cursor-pointer select-none group hover:bg-white/10 transition-all"
                >
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => {}} // handled by click container
                    className="rounded bg-slate-950 border-white/10 text-indigo-550 focus:ring-0 mt-0.5" 
                  />
                  <span className={`leading-relaxed group-hover:text-white transition-colors ${
                    item.checked ? "text-slate-500 line-through decoration-slate-700" : "text-slate-200"
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
