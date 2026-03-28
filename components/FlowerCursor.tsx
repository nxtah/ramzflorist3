"use client";
import * as React from "react";

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
  "#e879a0", "#f472b6", "#ec4899", "#c026d3", "#a855f7", "#f9a8d4", "#fda4af", "#fb7185", "#e11d48", "#d946ef",
];

function FlowerSVG({ petals, color, size }: { petals: number; color: string; size: number }) {
  const petalAngles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  const r = size * 0.38;
  const pr = size * 0.22;
  const py = size * 0.12;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {petalAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = Math.cos(rad - Math.PI / 2) * r;
          const cy = Math.sin(rad - Math.PI / 2) * r;
          return (
            <ellipse key={i} cx={cx} cy={cy} rx={pr} ry={py} fill={color} fillOpacity="0.85" transform={`rotate(${angle}, ${cx}, ${cy})`} />
          );
        })}
        <circle cx={0} cy={0} r={size * 0.12} fill="#fef08a" stroke="#fde047" strokeWidth="1" />
        <circle cx={0} cy={0} r={size * 0.05} fill="#ca8a04" />
      </g>
    </svg>
  );
}

let particleIdCounter = 0;

export function FlowerCursor() {
  const [particles, setParticles] = React.useState<FlowerParticle[]>([]);
  const lastSpawnTime = React.useRef(0);
  const animFrameRef = React.useRef<number>(0);
  const particlesRef = React.useRef<FlowerParticle[]>([]);
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -100, y: -100 });

  // Spawn a flower at given coordinates
  const spawnFlower = React.useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawnTime.current < 80) return;
    lastSpawnTime.current = now;
    const newParticle: FlowerParticle = {
      id: particleIdCounter++,
      x,
      y,
      size: 20 + Math.random() * 28,
      rotation: Math.random() * 360,
      color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
      petals: [5, 6, 8][Math.floor(Math.random() * 3)],
      born: now,
      velocityX: (Math.random() - 0.5) * 2.5,
      velocityY: -(1 + Math.random() * 2.5),
    };
    particlesRef.current = [...particlesRef.current, newParticle].slice(-40);
    setParticles([...particlesRef.current]);
  }, []);

  // Cleanup loop
  React.useEffect(() => {
    const loop = () => {
      const now = Date.now();
      const lifetime = 1200;
      const alive = particlesRef.current.filter((p) => now - p.born < lifetime);
      if (alive.length !== particlesRef.current.length) {
        particlesRef.current = alive;
        setParticles([...alive]);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      spawnFlower(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [spawnFlower]);

  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
  }, [pos]);

  // Hide cursor on desktop, show on mobile
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Custom cursor dot (desktop only) */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none"
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
      {/* Flower particles layer */}
      <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <AnimatedFlower key={p.id} particle={p} />
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          body { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}

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
      const dx = particle.velocityX * elapsed * 0.05;
      const dy = particle.velocityY * elapsed * 0.05;
      let scale: number;
      if (progress < 0.3) {
        scale = progress / 0.3;
      } else if (progress < 0.7) {
        scale = 1;
      } else {
        scale = 1 - (progress - 0.7) / 0.3;
      }
      const opacity = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
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
