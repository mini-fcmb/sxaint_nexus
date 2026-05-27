/**
 * REFACTORED: Features Section — Apple Tablet UI
 *
 * Drop-in replacement for the features section + FeatureCard in Homepage.tsx.
 * Preserves all existing logic (FEATURES data, auto-rotation, dot nav, transitions).
 *
 * Changes:
 *  - FeatureCard removed (replaced by inline tablet layout)
 *  - Features section wrapped in AppleTabletFeatures component
 *  - Left side: stacked 3-card image carousel (prev/next peek blurred behind active)
 *  - Right side: fade-transition text content panel
 *  - Dot indicators inside the tablet screen
 *  - Navbar & chat button z-index notes preserved
 *
 * Usage in Homepage.tsx:
 *  1. Remove the existing <FeatureCard …> component definition
 *  2. Replace the entire <div id="features" …>…</div> block with <AppleTabletFeatures />
 *  3. Import AppleTabletFeatures from this file (or paste inline)
 *  4. Keep all state/refs at the Homepage level and pass as props (shown below),
 *     OR use the self-contained version at the bottom of this file.
 */

import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ─── Data (keep your existing FEATURES array — copied here for reference) ── */
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

/* ─── Types ──────────────────────────────────────────────────────── */
type Feature = (typeof FEATURES)[0];
type CardSlot = "active" | "prev" | "next" | "hidden";

/* ─── ImageCarouselPane ───────────────────────────────────────────── */
function ImageCarouselPane({
  features,
  current,
  isAnimating,
  direction,
  onPrev,
  onNext,
  onDot,
}: {
  features: Feature[];
  current: number;
  isAnimating: boolean;
  direction: "left" | "right" | null;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}) {
  const total = features.length;

  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  /* Card slot → visual transform */
  const slotStyle = (slot: CardSlot): React.CSSProperties => {
    const baseTransition =
      "transform 0.55s cubic-bezier(0.34,1.1,0.64,1), opacity 0.45s ease, filter 0.45s ease, box-shadow 0.45s ease";

    if (slot === "active") {
      return {
        transform: "translateX(0%) scale(1)",
        opacity: 1,
        filter: "blur(0px) brightness(1)",
        zIndex: 10,
        boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
        transition: baseTransition,
        pointerEvents: "none",
      };
    }
    if (slot === "prev") {
      return {
        transform: "translateX(-58%) scale(0.82) rotateY(4deg)",
        opacity: 0.55,
        filter: "blur(1.5px) brightness(0.85)",
        zIndex: 5,
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        transition: baseTransition,
        pointerEvents: "auto",
        cursor: "pointer",
      };
    }
    if (slot === "next") {
      return {
        transform: "translateX(58%) scale(0.82) rotateY(-4deg)",
        opacity: 0.55,
        filter: "blur(1.5px) brightness(0.85)",
        zIndex: 5,
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        transition: baseTransition,
        pointerEvents: "auto",
        cursor: "pointer",
      };
    }
    /* hidden — out-of-view on whichever side we're animating toward */
    return {
      transform:
        direction === "left"
          ? "translateX(-120%) scale(0.7)"
          : "translateX(120%) scale(0.7)",
      opacity: 0,
      filter: "blur(3px)",
      zIndex: 1,
      transition: baseTransition,
      pointerEvents: "none",
    };
  };

  /* Which slot does each index occupy? */
  const getSlot = (idx: number): CardSlot => {
    if (idx === current) return "active";
    if (idx === prevIdx) return "prev";
    if (idx === nextIdx) return "next";
    return "hidden";
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Card stack */}
      <div
        className="relative w-full"
        style={{ height: "260px", perspective: "900px" }}
      >
        {features.map((f, idx) => {
          const slot = getSlot(idx);
          return (
            <div
              key={f.id}
              onClick={slot === "prev" ? onPrev : slot === "next" ? onNext : undefined}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "62%",
                maxWidth: "300px",
                aspectRatio: "4/3",
                marginTop: "-80px",
                marginLeft: "-31%",
                borderRadius: "16px",
                overflow: "hidden",
                transformOrigin: "center center",
                willChange: "transform, opacity, filter",
                ...slotStyle(slot),
              }}
            >
              <img
                src={f.image}
                alt={f.tag}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: isAnimating && slot === "active" ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.55s ease",
                }}
              />
              {/* Tag chip */}
              {slot === "active" && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "#007bff",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? "translateY(4px)" : "translateY(0)",
                    transition: "opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s",
                  }}
                >
                  {f.tag}
                </div>
              )}
              {/* Counter badge on active */}
              {slot === "active" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(4px)",
                    color: "#007bff",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "20px",
                  }}
                >
                  {current + 1} / {total}
                </div>
              )}
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Dot nav */}
      <div
        className="flex items-center justify-center gap-2"
        style={{ marginTop: "18px" }}
      >
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            aria-label={`Go to feature ${i + 1}`}
            style={{
              width: i === current ? "22px" : "8px",
              height: "8px",
              borderRadius: "20px",
              background: i === current ? "#007bff" : "#d1d5db",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.35s cubic-bezier(0.34,1.1,0.64,1), background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Prev / Next arrow buttons (bottom) */}
      <div className="flex items-center gap-3" style={{ marginTop: "14px" }}>
        <button
          onClick={onPrev}
          aria-label="Previous feature"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1.5px solid #e5e7eb",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s, box-shadow 0.2s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#fff";
          }}
        >
          <ChevronLeft size={15} color="#374151" />
        </button>
        <button
          onClick={onNext}
          aria-label="Next feature"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "none",
            background: "#007bff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 14px rgba(0,123,255,0.35)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#0056b3";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#007bff";
          }}
        >
          <ChevronRight size={15} color="#fff" />
        </button>
      </div>
    </div>
  );
}

/* ─── TextContentPane ─────────────────────────────────────────────── */
function TextContentPane({
  feature,
  isAnimating,
}: {
  feature: Feature;
  isAnimating: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "18px",
        padding: "28px 32px",
        height: "100%",
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? "translateY(10px)" : "translateY(0)",
        transition: "opacity 0.38s ease, transform 0.38s ease",
      }}
    >
      {/* Subtitle chip */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          background: "#eff6ff",
          color: "#007bff",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          padding: "5px 12px",
          borderRadius: "20px",
          width: "fit-content",
        }}
      >
        <Sparkles size={11} />
        {feature.subtitle}
      </span>

      {/* Title */}
      <div>
        <h3
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.25,
            margin: "0 0 8px",
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#64748b",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {feature.description}
        </p>
      </div>

      {/* Bullets */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "9px",
        }}
      >
        {feature.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              fontSize: "0.83rem",
              color: "#374151",
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateX(8px)" : "translateX(0)",
              transition: `opacity 0.35s ease ${0.08 + i * 0.06}s, transform 0.35s ease ${0.08 + i * 0.06}s`,
            }}
          >
            <CheckCircle2 size={14} color="#007bff" style={{ flexShrink: 0 }} />
            {b}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        style={{
          marginTop: "4px",
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: "#007bff",
          color: "#fff",
          fontSize: "0.82rem",
          fontWeight: 700,
          padding: "10px 20px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          width: "fit-content",
          transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
          boxShadow: "0 4px 16px rgba(0,123,255,0.3)",
          opacity: isAnimating ? 0 : 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#0056b3";
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#007bff";
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        Get Started <ArrowRight size={14} />
      </button>
    </div>
  );
}

/* ─── AppleTabletFeatures — self-contained drop-in ───────────────── */
export function AppleTabletFeatures() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleRotate = () => {
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    autoRotateRef.current = setTimeout(() => {
      triggerTransition("right", (p) => (p + 1) % FEATURES.length);
    }, 5000);
  };

  useEffect(() => {
    scheduleRotate();
    return () => {
      if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    };
  }, [current]);

  const triggerTransition = (
    dir: "left" | "right",
    getNext: (prev: number) => number
  ) => {
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(getNext);
      setIsAnimating(false);
    }, 400);
  };

  const goTo = (i: number) => {
    if (i === current || isAnimating) return;
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    const dir = i > current ? "right" : "left";
    triggerTransition(dir, () => i);
    scheduleRotate();
  };

  const prev = () => {
    if (isAnimating) return;
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    triggerTransition("left", (p) => (p - 1 + FEATURES.length) % FEATURES.length);
    scheduleRotate();
  };

  const next = () => {
    if (isAnimating) return;
    if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    triggerTransition("right", (p) => (p + 1) % FEATURES.length);
    scheduleRotate();
  };

  return (
    <div
      id="features"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f8faff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,123,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,123,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Apple Tablet Frame ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          /* Tablet outer shell */
          background: "#1a1a1a",
          borderRadius: "28px",
          padding: "16px",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
          position: "relative",
        }}
      >
        {/* Camera dot */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#2d2d2d",
            border: "1.5px solid #333",
            zIndex: 20,
          }}
        />

        {/* Screen bezel */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            minHeight: "420px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Left — image carousel */}
          <div
            style={{
              background: "#f9fafb",
              borderRight: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "28px 16px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle inner shadow edges */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.025) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.025) 100%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <div style={{ width: "100%", position: "relative", zIndex: 2 }}>
              <ImageCarouselPane
                features={FEATURES}
                current={current}
                isAnimating={isAnimating}
                direction={direction}
                onPrev={prev}
                onNext={next}
                onDot={goTo}
              />
            </div>
          </div>

          {/* Right — text content */}
          <div
            style={{
              background: "#ffffff",
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <TextContentPane
              feature={FEATURES[current]}
              isAnimating={isAnimating}
            />
          </div>
        </div>

        {/* Home button indicator line */}
        <div
          style={{
            width: "36px",
            height: "4px",
            background: "#333",
            borderRadius: "4px",
            margin: "10px auto 0",
          }}
        />
      </div>
    </div>
  );
}

export default AppleTabletFeatures;

/* ─────────────────────────────────────────────────────────────────
   INTEGRATION GUIDE FOR Homepage.tsx
   ─────────────────────────────────────────────────────────────────

   1. Import at top of Homepage.tsx:
        import { AppleTabletFeatures } from "./AppleTabletFeatures";
        (adjust path as needed)

   2. DELETE:
        - The entire FeatureCard component definition
        - The entire <div id="features" …>…</div> section

   3. REPLACE with:
        <AppleTabletFeatures />

   4. You can REMOVE these state variables from Homepage (they now live
      inside AppleTabletFeatures):
        - currentFeature
        - isAnimating
        - autoRotateRef
        - transition / goTo / prev / next helpers

   5. Keep the hero section, navbar, spacer div, and floating chat button
      exactly as-is. The navbar uses z-50 (z-index:50) and the chat button
      uses z-50 — both will render above the features tablet.

   6. The <div className="h-[300px]" /> spacer between the hero and features
      can be adjusted or removed depending on your scroll reveal preference.

   7. Responsive note:
      The tablet frame uses a 2-column grid. On small screens (< 640px) you
      may want to stack the columns. Add this to AppleTabletFeatures:
        @media (max-width: 640px) { grid-template-columns: 1fr }
      or use the Tailwind class below on the screen div:
        className="grid grid-cols-1 sm:grid-cols-2"
      (Replace the inline gridTemplateColumns style with that className.)
   ───────────────────────────────────────────────────────────────── */
