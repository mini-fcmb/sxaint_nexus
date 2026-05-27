/**
 * StatsSection.tsx  —  "Impact That Speaks for Itself"
 * Matches the reference image: muted gray background, oversized white numbers,
 * angled tablet mockup on left, two stacked stat blocks on right.
 *
 * Stack: React + Tailwind CSS
 * No external animation library required.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import image from "../assets/gadget.png";

/* ─── Easing ─────────────────────────────────────────────────────── */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/* ─── useCountUp hook ────────────────────────────────────────────── */
function useCountUp(
  start: number,
  end: number,
  duration: number,
  active: boolean,
) {
  const [value, setValue] = useState(start);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      setValue(Math.round(start + (end - start) * easeOutExpo(t)));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, start, end, duration]);

  return value;
}

/* ─── Donut Ring ─────────────────────────────────────────────────── */
function DonutRing({ pct }: { pct: number }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke="#EBF8FF"
        strokeWidth="3.5"
      />
      <circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke="#4299E1"
        strokeWidth="3.5"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fill="#2B6CB0"
      >
        {pct}%
      </text>
    </svg>
  );
}

/* ─── MiniBar ────────────────────────────────────────────────────── */
function MiniBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="mb-[4px]">
      <div className="flex justify-between" style={{ marginBottom: "2px" }}>
        <span style={{ fontSize: "7px", fontWeight: 600, color: "#4A5568" }}>
          {label}
        </span>
        <span style={{ fontSize: "7px", fontWeight: 700, color: "#4299E1" }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: "4px",
          background: "#EDF2F7",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#4299E1",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Dashboard Mockup ───────────────────────────────────────────── */
function DashboardMockup({ visible }: { visible: boolean }) {
  return (
    <div
      className="flex-1 flex items-end justify-center mt-7 pb-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) rotate(-3deg)"
          : "translateY(30px) rotate(-2deg)",
        transition: "opacity .9s ease .2s, transform .9s ease .2s",
      }}
    >
      <div
        style={{
          width: "85%",
          maxWidth: "320px",
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 28px 70px rgba(0,0,0,.35), 0 6px 16px rgba(0,0,0,.2)",
          transform: "perspective(600px) rotateX(8deg) rotateY(-8deg)",
        }}
      >
        {/* topBar */}
        <img src={image} />

        {/* Body */}
        <div
          style={{
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            background: "#F7F8FA",
          }}
        >
          {/* Card 1: Performance */}
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "9px",
              border: "1px solid #EDF2F7",
            }}
          >
            <p
              style={{
                fontSize: "7px",
                fontWeight: 700,
                color: "#A0AEC0",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                marginBottom: "5px",
              }}
            >
              Performance
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "7px",
              }}
            >
              <DonutRing pct={90} />
              <div>
                <p
                  style={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#2D3748",
                    margin: 0,
                  }}
                >
                  Class Avg
                </p>
                <span style={{ fontSize: "7px", color: "#A0AEC0" }}>
                  42 students
                </span>
              </div>
            </div>
            <MiniBar label="Math" pct={88} />
            <MiniBar label="Science" pct={76} />
            <MiniBar label="English" pct={92} />
          </div>

          {/* Card 2: Score Trends */}
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "9px",
              border: "1px solid #EDF2F7",
            }}
          >
            <p
              style={{
                fontSize: "7px",
                fontWeight: 700,
                color: "#A0AEC0",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                marginBottom: "5px",
              }}
            >
              Score Trends
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "3px",
                height: "44px",
              }}
            >
              {[
                { h: 34, bg: "#BEE3F8" },
                { h: 44, bg: "#4299E1" },
                { h: 26, bg: "#BEE3F8" },
                { h: 40, bg: "#4299E1" },
                { h: 44, bg: "#2B6CB0" },
                { h: 36, bg: "#BEE3F8" },
              ].map((b, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: b.h,
                    background: b.bg,
                    borderRadius: "3px 3px 0 0",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "3px",
              }}
            >
              {["M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} style={{ fontSize: "6px", color: "#CBD5E0" }}>
                  {d}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "8px",
                paddingTop: "6px",
                borderTop: "1px solid #EDF2F7",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#EBF4FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{ fontSize: "7px", fontWeight: 800, color: "#2B6CB0" }}
                >
                  24m
                </span>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#2D3748",
                    margin: 0,
                  }}
                >
                  Active Exam
                </p>
                <span style={{ fontSize: "6px", color: "#A0AEC0" }}>
                  Physics · Q12/30
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Recent Exams */}
          <div
            style={{
              gridColumn: "1/3",
              background: "#fff",
              borderRadius: "10px",
              padding: "9px",
              border: "1px solid #EDF2F7",
            }}
          >
            <p
              style={{
                fontSize: "7px",
                fontWeight: 700,
                color: "#A0AEC0",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                marginBottom: "5px",
              }}
            >
              Recent Exams
            </p>
            {[
              {
                name: "Biology Final — Form 4",
                meta: "68 students · 45 min",
                badge: "Completed",
                bg: "#F0FFF4",
                clr: "#276749",
              },
              {
                name: "Chemistry Midterm",
                meta: "54 students · 60 min",
                badge: "Grading",
                bg: "#EBF8FF",
                clr: "#2B6CB0",
              },
              {
                name: "English Comprehension",
                meta: "72 students · 30 min",
                badge: "Scheduled",
                bg: "#FFFFF0",
                clr: "#744210",
              },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "3px 0",
                  borderBottom: i < 2 ? "1px solid #F7F8FA" : "none",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "7px",
                      fontWeight: 600,
                      color: "#2D3748",
                      margin: 0,
                    }}
                  >
                    {row.name}
                  </p>
                  <span style={{ fontSize: "6px", color: "#A0AEC0" }}>
                    {row.meta}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "6px",
                    fontWeight: 700,
                    padding: "2px 5px",
                    borderRadius: "4px",
                    background: row.bg,
                    color: row.clr,
                  }}
                >
                  {row.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── StatBlock ──────────────────────────────────────────────────── */
function StatBlock({
  countStart,
  countEnd,
  duration,
  label,
  active,
  delay,
  isLast,
}: {
  countStart: number;
  countEnd: number;
  duration: number;
  label: string;
  active: boolean;
  delay: string;
  isLast: boolean;
}) {
  const value = useCountUp(countStart, countEnd, duration, active);

  return (
    <div
      className="flex-1 flex flex-col justify-end relative overflow-hidden"
      style={{
        padding:
          "clamp(24px,4vw,44px) clamp(24px,5vw,52px) clamp(24px,3.5vw,38px)",
        borderBottom: !isLast ? "1px solid rgba(255,255,255,.15)" : "none",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .75s ease ${delay}, transform .75s ease ${delay}`,
      }}
    >
      {/* Ghost watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "-10px",
          fontSize: "clamp(7rem,20vw,15rem)",
          fontWeight: 900,
          color: "rgba(0,0,0,.07)",
          lineHeight: 1,
          letterSpacing: "-.06em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {value}
      </div>

      {/* Number */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          lineHeight: 0.92,
          letterSpacing: "-.04em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span
          style={{
            fontSize: "clamp(5rem,13vw,9rem)",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontSize: "clamp(3rem,7.5vw,5.5rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,.75)",
            marginTop: ".08em",
          }}
        >
          %
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "18px",
        }}
      >
        <span
          style={{
            fontSize: "clamp(.75rem,1.5vw,.9rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: ".005em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: "rgba(255,255,255,.65)",
            fontSize: "1.1rem",
            fontWeight: 300,
          }}
        >
          ›
        </span>
      </div>
    </div>
  );
}

/* ─── StatsSection ────────────────────────────────────────────────── */
export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useCallback(() => setVisible(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  return (
    <section
      ref={ref}
      id="stats"
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "520px",
        background: "#8C8C8C",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          padding: "clamp(32px,5vw,52px) clamp(24px,4vw,44px) 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
            fontWeight: 300,
            color: "#fff",
            lineHeight: 1.25,
            letterSpacing: "-.01em",
            maxWidth: "320px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity .8s ease, transform .8s ease",
          }}
        >
          Impact That
          <br />
          Speaks for Itself
        </h2>
        <DashboardMockup visible={visible} />
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid rgba(255,255,255,.15)",
        }}
      >
        <StatBlock
          countStart={15}
          countEnd={90}
          duration={3000}
          label="Improved Student Performance"
          active={visible}
          delay="0.1s"
          isLast={false}
        />
        <StatBlock
          countStart={15}
          countEnd={95}
          duration={8000}
          label="Higher Exam Completion Rate"
          active={visible}
          delay="0.25s"
          isLast={true}
        />
      </div>

      {/* Responsive override via style tag */}
      <style>{`
        @media (max-width: 580px) {
          #stats { grid-template-columns: 1fr !important; }
          #stats > div:last-child { flex-direction: row; border-left: none; border-top: 1px solid rgba(255,255,255,.15); }
        }
      `}</style>
    </section>
  );
}

/*
 * INTEGRATION
 * ───────────
 * import StatsSection from "./StatsSection";
 * <StatsSection />   ← drop anywhere in your page
 *
 * Counter 1: 15 → 90  over 3 s  (fires on scroll into view, once)
 * Counter 2: 15 → 95  over 8 s  (starts simultaneously, 5 s slower)
 */
