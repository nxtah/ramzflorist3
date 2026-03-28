import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import BannerPromo from "@/components/banner-promo";

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
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
        <BannerPromo />
        <SmoothScroll>
          <div className="relative">
            <div className="fixed inset-0 z-0 bg-primary-900">
              <Footer />
            </div>

            <div className="relative z-10">
              <div className="bg-background">
                <Navbar />
                <main className="min-h-screen">{children}</main>
              </div>
              <div className="h-screen" aria-hidden />
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

// NavbarWrapper to make navbar absolute and layered above hero
function NavbarWrapper() {
  return (
    <div className="absolute top-0 left-0 w-full z-30">
      <Navbar />
    </div>
  );
}
