"use client";
import { useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  :root { --dark-color: transparent; }
  .flower-body { background-color: transparent !important; }
  .night { display: none !important; }
  svg, .flower-body, .night, .flower-bg, .flower-overlay {
    background: transparent !important;
    filter: none !important;
    box-shadow: none !important;
  }
  * {
    background: transparent !important;
    filter: none !important;
    box-shadow: none !important;
  }
  /* Remove any fill or rect with red */
  svg [fill="red"], svg rect[fill="red"], svg [fill="#ff0000"], svg [fill="#e53935"], svg [fill="#fb2c36"], svg [fill="#d32f2f"], svg [fill="#c62828"], svg [fill="#b71c1c"] {
    fill: transparent !important;
  }
  svg [style*="fill:red"], svg [style*="fill:#ff0000"], svg [style*="fill:#e53935"], svg [style*="fill:#fb2c36"], svg [style*="fill:#d32f2f"], svg [style*="fill:#c62828"], svg [style*="fill:#b71c1c"] {
    fill: transparent !important;
  }
  /* Remove any background color or overlay */
  .flower-bg, .flower-overlay {
    display: none !important;
  }
  /* Remove any filter that could cause red tint */
  svg [filter], svg [style*="filter"] {
    filter: none !important;
  }
  /* Remove any rect or shape with red color */
  svg rect[fill^="#fb2c36"], svg rect[fill^="#e53935"], svg rect[fill^="#ff0000"] {
    fill: transparent !important;
  }
  /* Remove any unwanted color overlays */
  .flower-overlay, .flower-bg {
    display: none !important;
  }
`;

// ...existing helper components from user...

export default function BlossomingFlowers() {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Store original styles
    const origBg = document.body.style.background;
    const origMin = document.body.style.minHeight;
    const origOf = document.body.style.overflow;

    // Removed body background modification to prevent landing page color issues

    return () => {
      document.head.removeChild(styleEl);
      document.body.style.background = origBg;
      document.body.style.minHeight = origMin;
      document.body.style.overflow = origOf;
    };
  }, []);

  return (
    <svg
      width="320"
      height="180"
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', margin: '0 auto', background: 'transparent' }}
    >
      {/* Example flower shapes, replace with your actual flower SVG */}
      <g>
        <ellipse cx="160" cy="150" rx="60" ry="20" fill="#FFD700" />
        <ellipse cx="160" cy="120" rx="40" ry="40" fill="#FF69B4" />
        <ellipse cx="160" cy="80" rx="20" ry="20" fill="#ADFF2F" />
        {/* Remove any red or overlay shapes */}
      </g>
    </svg>
  );
}
