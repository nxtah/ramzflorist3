"use client";

import * as React from "react";
import { HomeLiquidBackground } from "@/components/home-liquid-background";

// ─── Flower Particle System ──────────────────────────────────────────────────

interface FlowerParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  petals: number;
  born: number;
  velocityX: number;
  velocityY: number;
}

const FLOWER_COLORS = [
  "#e879a0", // hot pink
  "#f472b6", // pink-400
  "#ec4899", // pink-500
  "#c026d3", // fuchsia-600
  "#a855f7", // purple-500
  "#f9a8d4", // pink-300
  "#fda4af", // rose-300
  "#fb7185", // rose-400
  "#e11d48", // rose-600
  "#d946ef", // fuchsia-500
];

function FlowerSVG({
  petals,
  color,
  size,
}: {
  petals: number;
  color: string;
  size: number;
}) {
  const petalAngles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  const r = size * 0.38; // petal orbit radius
  const pr = size * 0.22; // petal rx
  const py = size * 0.12; // petal ry

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {petalAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = Math.cos(rad - Math.PI / 2) * r;
          const cy = Math.sin(rad - Math.PI / 2) * r;
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={pr}
              ry={py}
              fill={color}
              fillOpacity="0.85"
              transform={`rotate(${angle}, ${cx}, ${cy})`}
            />
          );
        })}
        {/* Center */}
        <circle
          cx={0}
          cy={0}
          r={size * 0.12}
          fill="#fef08a"
          stroke="#fde047"
          strokeWidth="1"
        />
        {/* Center dot */}
        <circle cx={0} cy={0} r={size * 0.05} fill="#ca8a04" />
      </g>
    </svg>
  );
}

// ─── Hero Section Component ──────────────────────────────────────────────────

let particleIdCounter = 0;

export default function HeroWithFlowers() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-primary-100/30 flex items-center justify-center snap-start"
      style={{ cursor: "auto" }}
    >
      <HomeLiquidBackground />

      {/* Soft transition bridge to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 md:h-40 bg-gradient-to-b from-transparent via-primary-50/70 to-primary-100/25" />

      {/* Hero text */}
      <div className="container relative z-20 px-4 text-center animate-fade-in-up pointer-events-none">
        <h1 className="font-heading text-6xl md:text-9xl lg:text-[12rem] xl:text-[15rem] leading-none font-bold text-primary-900 tracking-[5px] uppercase select-none">
          Ramz Florist3
        </h1>
      </div>
    </section>
  );
}

// ─── Animated Flower ─────────────────────────────────────────────────────────

function AnimatedFlower({ particle }: { particle: FlowerParticle }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const startRef = React.useRef(particle.born);
  const lifetime = 1200;

  React.useEffect(() => {
    let raf: number;
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      const elapsed = Date.now() - startRef.current;
      const progress = Math.min(elapsed / lifetime, 1);

      // Position drift
      const dx = particle.velocityX * elapsed * 0.05;
      const dy = particle.velocityY * elapsed * 0.05;

      // Scale: bloom in (0→0.3) then hold (0.3→0.7) then shrink (0.7→1)
      let scale: number;
      if (progress < 0.3) {
        scale = progress / 0.3; // 0 → 1
      } else if (progress < 0.7) {
        scale = 1;
      } else {
        scale = 1 - (progress - 0.7) / 0.3; // 1 → 0
      }

      // Opacity: fade out near end
      const opacity = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;

      // Spin
      const rotation = particle.rotation + elapsed * 0.1;

      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotation}deg) scale(${scale})`;
      el.style.opacity = String(opacity);

      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [particle]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: particle.x - particle.size / 2,
        top: particle.y - particle.size / 2,
        width: particle.size,
        height: particle.size,
        willChange: "transform, opacity",
        opacity: 0,
      }}
    >
      <FlowerSVG petals={particle.petals} color={particle.color} size={particle.size} />
    </div>
  );
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────

function CustomCursor({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const posRef = React.useRef({ x: -100, y: -100 });

  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, [sectionRef]);

  return (
    <div
      ref={dotRef}
      className="hidden md:block absolute top-0 left-0 z-30 pointer-events-none"
      style={{
        width: 20,
        height: 20,
        marginLeft: -10,
        marginTop: -10,
        borderRadius: "50%",
        background: "radial-gradient(circle, #ec4899 0%, #a855f7 100%)",
        boxShadow: "0 0 12px 4px rgba(236,72,153,0.5)",
        willChange: "transform",
        transform: "translate(-100px, -100px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
