"use client";

import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Quick hack to hide the global sticky footer from RootLayout when in Admin pages
  useEffect(() => {
    // Find the spacer div that makes the sticky footer work
    const els = document.querySelectorAll('div[aria-hidden="true"]');
    els.forEach(el => {
      if (el.className.includes('h-screen')) {
         (el as HTMLElement).style.display = 'none';
      }
    });

    const footers = document.querySelectorAll('.fixed.inset-0.z-0');
    footers.forEach(el => {
         (el as HTMLElement).style.display = 'none';
    });
    
    return () => {
      // Revert when leaving admin
      els.forEach(el => {
        if (el.className.includes('h-screen')) {
           (el as HTMLElement).style.display = 'block';
        }
      });
      footers.forEach(el => {
           (el as HTMLElement).style.display = 'block';
      });
    }
  }, []);

  return (
    <div className="relative z-50 bg-background min-h-screen">
      {children}
    </div>
  );
}
