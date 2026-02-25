import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const magnetik = localFont({
  src: "../public/fonts/Magnetik-Light.otf",
  variable: "--font-body",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAMZ FLORIST3",
  description: "Elegant Florist & Bouquet Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${instrumentSerif.variable}
          ${magnetik.variable}
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
        style={{
          fontFamily: 'var(--font-body)',
        }}
      >
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen bg-secondary/30">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
