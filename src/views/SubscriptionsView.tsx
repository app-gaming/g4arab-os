import React, { useState } from "react";
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Award,
  Globe,
  Gauge,
  HelpCircle
} from "lucide-react";

interface SubscriptionsViewProps {
  lang: "EN" | "AR";
}

export default function SubscriptionsView({ lang }: SubscriptionsViewProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  
  // Custom states for payment simulation modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const plans = [
    {
      id: "free",
      nameEN: "Standard Node",
      nameAR: "عقدة مجانية",
      priceMonthly: 0,
      priceYearly: 0,
      descEN: "Essential gaming intelligence tools for casual creators.",
      descAR: "منظومة الأدوات الأساسية لمصممي وهواة محتوى الألعاب.",
      icon: Gauge,
      iconColor: "text-slate-400",
      featuresEN: [
        "Standard RSS sources integration",
        "Riyadh cluster node (Standard latency)",
        "G4Arab OS web view interface",
        "Up to 3 active campaign draft-boards",
        "Basic telemetry reading (NOMINAL level)"
      ],
      featuresAR: [
        "إدخال وتوصيل مصادر البيانات القياسية",
        "مجموعات خوادم الرياض (سرعة اتصال قياسية)",
        "واجهة تصفح منصة G4Arab الأساسية",
        "عدد أقصى ٣ مسودات أو لوحات مهام",
        "قراءة تحليلات الأداء والبيانات العامة فقط"
      ],
      ctaEN: "Current Plan",
      ctaAR: "المسار الحالي",
      popular: false
    },
    {
      id: "pro",
      nameEN: "Creator Spectrum Pro",
      nameAR: "المحترف فائق السرعة",
      priceMonthly: 29,
      priceYearly: 22, // ~25% discount
      descEN: "Tailor-made for active broadcasters and editorial leak syndicates.",
      descAR: "مصممة خصيصًا للمعدين، أصحاب قنوات البث والمحللين ومتابعي التسريبات.",
      icon: Zap,
      iconColor: "text-cyan-400 animate-pulse",
      featuresEN: [
        "8K instant broadcast stream pipeline",
        "Dual-language AI translations (English <> Arabic)",
        "Priority Riyadh Node access (<4ms ping rate)",
        "Unlimited campaigns & custom status flows",
        "Active Blackwell hardware spec comparison modules",
        "Enhanced audio terminal feedback & soundscapes"
      ],
      featuresAR: [
        "بوابة بث وصور فورية بجودة 8K المحدثة",
        "ترجمة ذكاء اصطناعي تفاعيلية مزدوجة مع Gemini",
        "أولوية اتصال بخوادم ومجموعات الرياض (أ)",
        "حذف وإضافة وتعديل مهام وحملات غير محدودة",
        "مقارنة مخططات وقطع الهاردوير من Blackwell",
        "أصوات حقيقية للوحة الأوامر بدون أي تصفير"
      ],
      ctaEN: "Upgrade Now",
      ctaAR: "احصل على الاشتراك الآن",
      badgeEN: "MOST POPULAR",
      badgeAR: "الأكثر اختياراً",
      popular: true
    },
    {
      id: "enterprise",
      nameEN: "Syndicate Ultimate",
      nameAR: "نقابة التحالف الكبرى",
      priceMonthly: 99,
      priceYearly: 79, // ~20% discount
      descEN: "Full administrative suite for major media bureaus and esports divisions.",
      descAR: "لوحة تحكم إدارية شاملة للوكالات الإعلامية الكبرى وبطولات الرياضات الإلكترونية.",
      icon: Crown,
      iconColor: "text-indigo-400",
      featuresEN: [
        "Everything in Creator Pro plan",
        "Automated scraper pipeline feeds with OCR sync",
        "Multi-admin Level 99 node authority bypass",
        "Custom dedicated GIS database overlays for GTA VI mapping",
        "24/7 priority secure telemetry support team",
        "White-label custom OS brand branding override"
      ],
      featuresAR: [
        "جميع خصائص وميزات الاشتراك المحترف",
        "تشفير وجلب تلقائي للملفات ومسح الصور ذكياً",
        "حقوق مشرف متقدمة وتعدي كامل للمجموعات",
        "استخدام خرائط الرياض الجغرافية لمحللي التسريبات",
        "دعم فني كامل وإصلاح ذاتي للأخطاء الحاصلة",
        "إمكانية تغيير شعار منصة G4Arab لعلامتك التجارية"
      ],
      ctaEN: "Acquire Sovereignty",
      ctaAR: "تفعيل السيادة الكاملة",
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === "free") {
      alert(lang === "EN" ? "You are already using this free plan." : "أنت تعمل بالفعل على هذا المسار المجاني الافتراضي.");
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) return;

    // Simulate verified secure backend connection
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentSuccess(false);
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCvv("");
      alert(
        lang === "EN" 
          ? `Sovereign permission granted! Your nodes are now upgrading to ${selectedPlan.toUpperCase()} parameters.` 
          : `تم منح تفويض السيادة المالي! يتم الآن ترقية العقد والمجموعات وتفعيل مميزات ومفاتيح الباقة المحددة بنجاح.`
      );
    }, 1800);
  };

  const currentActivePlanDetails = plans.find(p => p.id === selectedPlan) || plans[1];

  return (
    <div className="space-y-6 select-none relative z-10" dir={lang === "AR" ? "rtl" : "ltr"}>
      
      {/* Title bar Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-5 gap-4">
        <div>
          <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            {lang === "EN" ? "Administrative Subscriptions" : "الاشتراكات وبروتوكولات الترقية"}
          </h2>
          <p className="font-mono text-xs text-indigo-300 mt-1.5 leading-relaxed">
            {lang === "EN" 
              ? "Upgrade your computing nodes to unlock instant 8K broadcast pipes and full Gemini translation models." 
              : "قم بترقية عقد الاتصال والإنتاج لدينا لفتح قنوات البث الفوري بدقة 8K، والوصول لأعلى سرعات خوادم الرياض الذكية."}
          </p>
        </div>

        {/* Toggle Switcher Monthly vs Yearly */}
        <div className="bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 flex items-center gap-1.5 self-stretch md:self-auto justify-center">
          <button 
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 font-mono text-xs rounded-xl transition-all cursor-pointer ${
              billingPeriod === "monthly" 
                ? "bg-white/10 text-white shadow-inner font-extrabold" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === "EN" ? "Monthly Billing" : "فوترة شهرية"}
          </button>
          <button 
            onClick={() => setBillingPeriod("yearly")}
            className={`px-4 py-2 font-mono text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 relative ${
              billingPeriod === "yearly" 
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-extrabold" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === "EN" ? "Yearly Billing" : "فوترة سنوية"}
            <span className="bg-emerald-500/25 border border-emerald-400 text-emerald-400 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full">
              {lang === "EN" ? "SAVE ~25%" : "وفر ٢٥٪ "}
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {plans.map((p) => {
          const price = billingPeriod === "monthly" ? p.priceMonthly : p.priceYearly;
          const isSelected = selectedPlan === p.id;
          const PlanIcon = p.icon;

          return (
            <div 
              key={p.id}
              className={`bg-white/5 border backdrop-blur-md rounded-3xl p-6 flex flex-col gap-6 relative shadow-2xl transition-all duration-300 group ${
                p.popular 
                  ? "border-cyan-500/40 bg-zinc-900/10 shadow-cyan-500/5 ring-1 ring-cyan-500/20" 
                  : "border-white/10 hover:border-indigo-500/30 hover:bg-white/10"
              }`}
            >
              {/* Popular Badge */}
              {p.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-sans font-black text-[9px] tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg shadow-cyan-500/20">
                  {lang === "EN" ? p.badgeEN : p.badgeAR}
                </div>
              )}

              {/* Card Header info */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-sans font-black text-lg text-slate-100 group-hover:text-white transition-colors">
                    {lang === "EN" ? p.nameEN : p.nameAR}
                  </span>
                  <PlanIcon className={`w-6 h-6 ${p.iconColor}`} />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed min-h-[40px]">
                  {lang === "EN" ? p.descEN : p.descAR}
                </p>
              </div>

              {/* Price segment */}
              <div className="border-y border-white/5 py-4 flex items-baseline gap-1 select-none">
                <span className="font-mono font-black text-3.5xl text-white">
                  ${price}
                </span>
                <span className="font-mono text-slate-400 text-xs text-indigo-300">
                  / {billingPeriod === "monthly" ? (lang === "EN" ? "month" : "شهرياً") : (lang === "EN" ? "month" : "شهرياً")}
                </span>
                {billingPeriod === "yearly" && p.id !== "free" && (
                  <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                    ({lang === "EN" ? `Billed $${price * 12} annually` : `تُفوتر $${price * 12} سنوياً`})
                  </span>
                )}
              </div>

              {/* Features List */}
              <div className="flex-1 space-y-3 pt-2">
                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                  {lang === "EN" ? "INCLUDED CAPABILITIES" : "المواصفات وبروتوكولات التمكين"}
                </div>
                <ul className="space-y-2.5 text-xs">
                  {(lang === "EN" ? p.featuresEN : p.featuresAR).map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-slate-350">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[3px]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscription Call To Action */}
              <button
                onClick={() => handleSelectPlan(p.id)}
                className={`w-full py-3.5 rounded-2xl font-sans font-bold text-xs uppercase tracking-wider relative overflow-hidden transition-all duration-300 cursor-pointer ${
                  p.id === "free" 
                    ? "bg-slate-950 text-slate-400 border border-white/5 hover:bg-slate-900" 
                    : p.popular 
                      ? "bg-cyan-505 hover:bg-cyan-600 text-slate-950 shadow-lg shadow-cyan-555/20 hover:brightness-110" 
                      : "bg-indigo-505 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-505/20"
                }`}
              >
                {lang === "EN" ? p.ctaEN : p.ctaAR}
              </button>
            </div>
          );
        })}
      </div>

      {/* Subscription Security Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 select-none">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
          <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-sans font-bold text-white text-xs leading-none">
              {lang === "EN" ? "PCI-DSS Level 1 Secure" : "بوابات أمن الحماية بمستوى ١"}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider">
              {lang === "EN" ? "SECURE SSL HANDSHAKE" : "اتصال آمن ببروتوكولات TLS 1.3"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
          <Globe className="w-10 h-10 text-cyan-400 shrink-0" />
          <div>
            <h4 className="font-sans font-bold text-white text-xs leading-none">
              {lang === "EN" ? "Instant Node Provisioning" : "ترقية آلية وجاهزة مباشرة"}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider">
              {lang === "EN" ? "RIYADH CORE HUB SYNC" : "تزامن فوري ومباشر مع خوادم الرياض"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
          <HelpCircle className="w-10 h-10 text-indigo-400 shrink-0" />
          <div>
            <h4 className="font-sans font-bold text-white text-xs leading-none">
              {lang === "EN" ? "Cancel Anytime" : "إمكانية الإلغاء في أي وقت"}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider">
              {lang === "EN" ? "NO HIDDEN COMMISSIONS" : "بدون فرض أي رسوم إضافية مخفية"}
            </p>
          </div>
        </div>
      </div>

      {/* Secure Payment Simulation Modal Checkouts */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
            <h3 className="font-sans font-extrabold text-indigo-300 text-base mb-2">
              {lang === "EN" ? "Administrative Checkout Pipeline" : "بوابة تسوية ودفع اشتراك المسارات"}
            </h3>
            <p className="text-[11px] text-slate-400 mb-6 font-mono">
              {lang === "EN" 
                ? `PLAN: ${currentActivePlanDetails.nameEN} (${billingPeriod.toUpperCase()})` 
                : `المسار المحدد: ${currentActivePlanDetails.nameAR} (${billingPeriod === "monthly" ? "الدفع شهري" : "الدفع سنوي"})`}
            </p>

            {paymentSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/25 border border-emerald-400 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-sans font-bold text-white text-sm">
                    {lang === "EN" ? "Transaction Authorized!" : "تمت الموافقة وتفويض الاتصال المالي!"}
                  </p>
                  <p className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
                    {lang === "EN" ? "Node status upgrading..." : "جاري ترقية واستقرار العقد النشطة..."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
                {/* Simulated Card design */}
                <div className="relative h-44 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-2xl border border-white/10 p-5 shadow-lg flex flex-col justify-between text-left" style={{ direction: "ltr" }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-[8px] text-indigo-300 tracking-widest">SYSTEM AUTHORITY GATEWAY</p>
                      <p className="font-sans font-bold text-white text-sm mt-1">G4Arab Executive Node</p>
                    </div>
                    <CreditCard className="w-6 h-6 text-indigo-400" />
                  </div>

                  <div className="space-y-3">
                    <p className="font-mono text-base text-cyan-400 tracking-widest font-semibold placeholder:text-slate-600">
                      {cardNumber || "••••  ••••  ••••  ••••"}
                    </p>
                    
                    <div className="flex justify-between items-end font-mono">
                      <div>
                        <p className="text-[7px] text-indigo-300 tracking-wider">HOLDER NAME</p>
                        <p className="text-[10px] text-white font-medium uppercase tracking-tight">{cardName || "COMMANDER G4"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[7px] text-indigo-300 tracking-wider">EXPIRY DATE</p>
                        <p className="text-[10px] text-white font-medium">{cardExpiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Inputs with dynamic state previews */}
                <div className="space-y-3.5">
                  <div className="space-y-1 text-left" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
                    <label className="text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                      {lang === "EN" ? "Cardholder Name" : "اسم حامل البطاقة"}
                    </label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder={lang === "EN" ? "e.g., Sarah Jenkins" : "مثال: علاء الدين الجابر"} 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:ring-0 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1 text-left" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
                    <label className="text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                      {lang === "EN" ? "Card Number" : "رقم البطاقة الائتمانية"}
                    </label>
                    <input 
                      type="text" 
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        // formats to 4-digit blocks
                        const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setCardNumber(val);
                      }}
                      placeholder="4000 1234 5678 9010" 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white font-mono tracking-widest focus:border-indigo-500 focus:ring-0 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 text-left" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
                      <label className="text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                        {lang === "EN" ? "Expiration Date" : "تاريخ الانتهاء"}
                      </label>
                      <input 
                        type="text" 
                        maxLength={5}
                        placeholder="MM/YY" 
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\//g, '');
                          if (val.length > 2) {
                            val = val.substring(0, 2) + "/" + val.substring(2);
                          }
                          setCardExpiry(val);
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white font-mono text-center focus:border-indigo-500 focus:ring-0 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1 text-left" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
                      <label className="text-slate-400 font-mono uppercase tracking-wider block text-[10px]">
                        CVV / CVC
                      </label>
                      <input 
                        type="password" 
                        maxLength={4}
                        placeholder="•••" 
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white font-mono text-center focus:border-indigo-500 focus:ring-0 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Cancel / Submit Buttons */}
                <div className="flex gap-2 justify-end pt-4 border-t border-white/5">
                  <button 
                    type="button" 
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-400 rounded-xl font-mono uppercase tracking-widest text-[9px] cursor-pointer"
                  >
                    {lang === "EN" ? "Abondon Checkout" : "تراجع وإلغاء"}
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-505 text-white font-sans font-bold rounded-xl hover:bg-indigo-600 cursor-pointer text-[9px] uppercase tracking-wider flex items-center gap-1.5"
                  >
                    {lang === "EN" ? "Authorize Payment" : "تفويض وتأكيد الدفع"}
                    <ArrowRight className="w-3.5 h-3.5 text-inherit" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
