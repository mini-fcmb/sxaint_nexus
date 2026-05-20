import {
  MessageCircle,
  Banknote,
  Info,
  Mail,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import sxaint_promo_hp from "../assets/mp4_files/sxaint_promo_hp.mp4.mp4";

/* ─── Data ───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    id: 0,
    tag: "Question Bank",
    title: "Create Exams in Minutes",
    subtitle: "No coding. Just results.",
    image: "https://picsum.photos/seed/questions/900/600",
    description:
      "50,000+ questions. Drag & drop. MCQ, essay, math, multimedia. Real-time preview. Launch in under 5 minutes.",
    bullets: [
      "50,000+ question bank",
      "Drag & drop interface",
      "Multiple formats supported",
    ],
  },
  {
    id: 1,
    tag: "Proctoring",
    title: "AI-Powered Proctoring",
    subtitle: "Catch cheating instantly.",
    image: "https://picsum.photos/seed/proctoring/900/600",
    description:
      "Webcam + eye tracking. Tab switch alerts. Full session recording. GDPR & FERPA compliant. Exportable reports.",
    bullets: [
      "Real-time monitoring",
      "Tab switch detection",
      "Session recording",
    ],
  },
  {
    id: 2,
    tag: "Grading",
    title: "Instant Grading & Insights",
    subtitle: "Results in seconds.",
    image: "https://picsum.photos/seed/grading/900/600",
    description:
      "Auto-grade MCQs. AI essay scoring. Interactive dashboards. Track trends. Identify weak topics.",
    bullets: ["Auto-grading", "AI essay scoring", "Analytics dashboard"],
  },
  {
    id: 3,
    tag: "Mobile",
    title: "Test Anywhere",
    subtitle: "Mobile, tablet, desktop.",
    image: "https://picsum.photos/seed/mobile/900/600",
    description:
      "Offline mode. Auto-sync. Push alerts. Low-data mode. Start, pause, resume anytime.",
    bullets: ["Offline mode", "Cross-platform", "Auto-sync"],
  },
  {
    id: 4,
    tag: "Enterprise",
    title: "Scale Without Limits",
    subtitle: "From 10 to 100,000+ users.",
    image: "https://picsum.photos/seed/analytics/900/600",
    description:
      "LMS integration. White-label. 99.99% uptime. Admin, teacher, proctor roles.",
    bullets: ["LMS integration", "White-label", "99.99% uptime"],
  },
];

const NAV_LINKS = [
  { href: "#features", Icon: Sparkles, label: "Features" },
  { href: "#pricing", Icon: Banknote, label: "Pricing" },
  { href: "#about", Icon: Info, label: "About" },
  { href: "#contact", Icon: Mail, label: "Contact" },
];

/* ─── FeatureCard ─────────────────────────────────────────────── */
function FeatureCard({
  feature,
  index,
  total,
  isAnimating,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  total: number;
  isAnimating: boolean;
}) {
  return (
    <div
      className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      style={{
        minHeight: "440px",
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating
          ? "translateY(16px) scale(0.99)"
          : "translateY(0) scale(1)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* ── Image pane ── */}
      <div className="relative md:w-[48%] shrink-0 overflow-hidden bg-gray-100">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-56 md:h-full object-cover"
          style={{ transition: "transform 0.6s ease" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
          }
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Counter badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#007bff] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {index + 1} / {total}
        </div>

        {/* Tag chip on image bottom */}
        <div className="absolute bottom-4 left-4 bg-[#007bff] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {feature.tag}
        </div>
      </div>

      {/* ── Content pane ── */}
      <div className="flex flex-col justify-center gap-5 p-8 md:p-10 md:py-12">
        {/* Subtitle chip */}
        <span className="inline-flex w-fit items-center gap-1.5 bg-blue-50 text-[#007bff] text-xs font-semibold px-3 py-1.5 rounded-full">
          <Sparkles size={11} />
          {feature.subtitle}
        </span>

        {/* Title + description */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-[1.75rem] font-extrabold text-gray-900 leading-snug">
            {feature.title}
          </h3>
          <p className="text-gray-500 text-sm md:text-[0.9rem] leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-2.5">
          {feature.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-gray-700 text-sm"
            >
              <CheckCircle2 size={15} className="text-[#007bff] shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="mt-1 w-fit flex items-center gap-2 bg-[#007bff] hover:bg-[#0056b3] text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
          style={{ transition: "background 0.2s, transform 0.15s" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Get Started <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ─── Homepage ────────────────────────────────────────────────── */
export default function Homepage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Scroll progress: 0 = top, 1 = features fully visible */
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-rotate features */
  const scheduleRotate = () => {
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    autoRotateRef.current = setTimeout(() => {
      transition((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
  };

  useEffect(() => {
    if (scrollProgress >= 0.9) scheduleRotate();
    return () => {
      if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    };
  }, [currentFeature, scrollProgress]);

  const transition = (getNext: (prev: number) => number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentFeature(getNext);
      setIsAnimating(false);
    }, 400);
  };

  const goTo = (i: number) => {
    if (i === currentFeature) return;
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    transition(() => i);
    scheduleRotate();
  };

  const prev = () => {
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    transition((p) => (p - 1 + FEATURES.length) % FEATURES.length);
    scheduleRotate();
  };

  const next = () => {
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    transition((p) => (p + 1) % FEATURES.length);
    scheduleRotate();
  };

  const heroOpacity = Math.max(1 - scrollProgress * 1.4, 0);
  const featuresOpacity = Math.min((scrollProgress - 0.5) * 3, 1);
  const showFeatures = scrollProgress >= 0.5;

  return (
    <div className="relative">
      {/* ══════════════════════════════════════════════
          HERO — fixed, fades out on scroll
      ══════════════════════════════════════════════ */}
      <div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden z-10"
        style={{
          opacity: heroOpacity,
          pointerEvents: heroOpacity > 0.05 ? "auto" : "none",
        }}
      >
        {/* ── Navbar ── */}
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src={logo}
              alt="SXaint logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
            />
            <span className="hidden sm:inline text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#007bff] to-[#0056b3] bg-clip-text text-transparent tracking-tight">
              SXaint
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            {NAV_LINKS.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#007bff] transition-colors duration-200"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
            <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold bg-[#007bff] hover:bg-[#0056b3] transition-all duration-200 hover:scale-105 active:scale-95">
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} className="text-gray-700" />
          </button>
        </nav>

        {/* ── Mobile slide-out menu ── */}
        <div
          className={`fixed inset-0 bg-black/50 z-50 transition-all duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} className="text-gray-700" />
            </button>
            <nav className="flex flex-col gap-2 mt-6">
              {NAV_LINKS.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-3 text-base font-medium text-gray-800 py-3 px-4 hover:bg-gray-50 hover:text-[#007bff] rounded-xl transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={18} /> {label}
                </a>
              ))}
              <button
                className="flex items-center justify-center gap-2 mt-4 px-6 py-3 rounded-xl text-white bg-[#007bff] hover:bg-[#0056b3] font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Get Started <ArrowRight size={18} />
              </button>
            </nav>
          </div>
        </div>

        {/* ── Video background ── */}
        <main className="relative h-[calc(100vh-65px)] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={sxaint_promo_hp} type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

          {/* Hero copy */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold tracking-widest text-blue-300 uppercase mb-4">
                Assessment Platform
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                Evidence-Based Strategies
                <br className="hidden sm:block" /> for Lasting Change
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
                Build resilience, overcome challenges — your path to emotional
                balance starts here.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#007bff] hover:bg-[#0056b3] text-white font-semibold rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30">
                  Get Started <ArrowRight size={16} />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/30 transition-all backdrop-blur-sm">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <span className="text-white/70 text-xs tracking-wider uppercase">
              Scroll to explore
            </span>
            <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-1.5 bg-white rounded-full animate-scroll" />
            </div>
          </div>
        </main>
      </div>

      {/* ══════════════════════════════════════════════
          FEATURES — scrolls in after hero fades
      ══════════════════════════════════════════════ */}

      {/* Spacer so features start below the viewport */}
      <div className="h-[300px]" />
      <div
        id="features"
        className="relative min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f8faff 100%)",
          opacity: featuresOpacity,
          pointerEvents: showFeatures ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Decorative background circle */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,123,255,0.06) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-40 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,123,255,0.04) 0%, transparent 70%)",
            transform: "translate(-30%, 0)",
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          {/* ── Feature card + arrows ── */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={prev}
              aria-label="Previous feature"
              className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all z-10 border border-gray-100"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>

            {/* Right arrow */}
            <button
              onClick={next}
              aria-label="Next feature"
              className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all z-10 border border-gray-100"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>

            <FeatureCard
              feature={FEATURES[currentFeature]}
              index={currentFeature}
              total={FEATURES.length}
              isAnimating={isAnimating}
            />
          </div>

          {/* ── Dot navigation ── */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to feature ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentFeature ? "28px" : "10px",
                  height: "10px",
                  background: i === currentFeature ? "#007bff" : "#d1d5db",
                }}
              />
            ))}
          </div>

          {/* ── Progress bar ── */}
          <div className="max-w-xs mx-auto mt-4">
            <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#007bff] rounded-full"
                style={{
                  width: `${((currentFeature + 1) / FEATURES.length) * 100}%`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* ── Mobile prev / next ── */}
          <div className="flex justify-center gap-3 mt-6 md:hidden">
            <button
              onClick={prev}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={15} /> Prev
            </button>
            <button
              onClick={next}
              className="flex items-center gap-1 text-sm font-medium text-white px-4 py-2 rounded-xl bg-[#007bff] hover:bg-[#0056b3] transition-colors"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Chat support button (always visible) ── */}
      <button
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 w-13 h-13 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center z-50 transition-transform hover:scale-110 active:scale-95"
        style={{
          width: "52px",
          height: "52px",
          background: "rgba(0,0,0,0.75)",
        }}
        aria-label="Open support chat"
      >
        <MessageCircle size={22} fill="white" stroke="white" />
      </button>

      <style>{`
        @keyframes scroll {
          0%   { transform: translateY(0);  opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
