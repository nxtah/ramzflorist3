export function HomeLiquidBackground() {
  return (
    <div className="home-liquid-layer" aria-hidden>
      <div className="home-liquid-mesh" />

      <svg
        className="home-liquid-svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="home-liquid-distort" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="7" result="noise">
              <animate attributeName="baseFrequency" dur="14s" values="0.006 0.012;0.01 0.02;0.006 0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="54" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>

        <g filter="url(#home-liquid-distort)" opacity="0.85">
          <ellipse className="home-liquid-blob home-liquid-blob-a" cx="260" cy="220" rx="280" ry="210" fill="url(#paintA)" />
          <ellipse className="home-liquid-blob home-liquid-blob-b" cx="1330" cy="190" rx="320" ry="240" fill="url(#paintB)" />
          <ellipse className="home-liquid-blob home-liquid-blob-c" cx="840" cy="700" rx="420" ry="220" fill="url(#paintC)" />
          <ellipse className="home-liquid-blob home-liquid-blob-d" cx="980" cy="380" rx="220" ry="180" fill="url(#paintD)" />
        </g>

        <defs>
          <radialGradient id="paintA" cx="0" cy="0" r="1" gradientTransform="translate(0.32 0.28) rotate(40) scale(1.2)">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.18" />
          </radialGradient>
          <radialGradient id="paintB" cx="0" cy="0" r="1" gradientTransform="translate(0.6 0.35) rotate(10) scale(1.2)">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="paintC" cx="0" cy="0" r="1" gradientTransform="translate(0.55 0.55) rotate(20) scale(1.25)">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.14" />
          </radialGradient>
          <radialGradient id="paintD" cx="0" cy="0" r="1" gradientTransform="translate(0.45 0.42) rotate(35) scale(1.2)">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>

      <div className="home-liquid-grain" />
    </div>
  );
}
