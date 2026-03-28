"use client";

import HeroWithFlowers from "@/components/HeroWithFlowers";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Bouquet } from '@/components/bouquet-card';
import { ArrowRight, Star, Truck, ShieldCheck, Heart, ChevronDown, Gift, Package } from 'lucide-react';
import { BouquetCard } from '@/components/bouquet-card';

interface LandingPageProps {
    featuredBouquets: Bouquet[];
    categories: string[];
}

function AccordionItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
    return (
        <div className="bg-white rounded-xl border border-primary-100/50 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(156,39,176,0.12)]">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-3 md:py-4 px-4 md:px-6 md:px-8 text-left focus:outline-none group min-h-0"
            >
                <span className="font-heading text-lg md:text-xl font-bold text-primary-900 group-hover:text-primary-600 transition-colors pr-8 font-magnetik-light">{q}</span>
                <div className={`shrink-0 w-12 h-12 rounded-full border border-primary-100 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 bg-primary-600 border-primary-600 text-white' : 'text-primary-400 bg-primary-50/50'}`}>
                    <ChevronDown className="w-6 h-6 transition-transform" />
                </div>
            </button>
            <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-8 md:px-10 pb-10 text-base md:text-lg text-muted-foreground leading-relaxed font-magnetik-light">
                        {a}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LandingPage({ featuredBouquets, categories }: LandingPageProps) {
    const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

    const categoryIcons: Record<string, React.ElementType> = {
        "Mini Flower": Star,
        "Fresh Flower": Heart,
        "Artificial Flowers": ShieldCheck,
        "Pipe Cleaner Flowers": SparkleIcon,
        "Doll": Gift,
        "Ballon": BalloonIcon,
        "Butterfly": ButterflyIcon,
        "Snack": Package,
        "Money": MoneyIcon,
        "Potted": LeafIcon,
        "Doll Box": Gift,
        "Hampers": Package,
    };

    const fallbackIcons = [Heart, Star, Gift, Package, ShieldCheck, Truck];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <HeroWithFlowers />

            {/* Marquee Features Section */}
            <section className="relative -mt-12 md:-mt-16 min-h-screen flex flex-col justify-center bg-primary-100/20 pt-28 md:pt-32 pb-20 overflow-hidden snap-start">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-20 bg-gradient-to-b from-primary-100/20 to-transparent" />
                {/* Top Marquee - Moving Right (Reverse) */}
                <div className="flex overflow-hidden py-4 bg-white/50 backdrop-blur-sm border-y border-primary-100/50 rotate-[-2deg] scale-110 mb-10">
                    <div className="flex animate-marquee-reverse whitespace-nowrap shrink-0">
                        <span className="text-4xl md:text-6xl font-body text-primary-200 mx-8">KUALITAS PREMIUM • BUNGA SEGAR • DESAIN EKSKLUSIF • DIBUAT DENGAN CINTA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-200 mx-8">KUALITAS PREMIUM • BUNGA SEGAR • DESAIN EKSKLUSIF • DIBUAT DENGAN CINTA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-200 mx-8">KUALITAS PREMIUM • BUNGA SEGAR • DESAIN EKSKLUSIF • DIBUAT DENGAN CINTA •</span>
                    </div>
                    <div className="flex animate-marquee-reverse whitespace-nowrap shrink-0">
                        <span className="text-4xl md:text-6xl font-body text-primary-200 mx-8">KUALITAS PREMIUM • BUNGA SEGAR • DESAIN EKSKLUSIF • DIBUAT DENGAN CINTA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-200 mx-8">KUALITAS PREMIUM • BUNGA SEGAR • DESAIN EKSKLUSIF • DIBUAT DENGAN CINTA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-200 mx-8">KUALITAS PREMIUM • BUNGA SEGAR • DESAIN EKSKLUSIF • DIBUAT DENGAN CINTA •</span>
                    </div>
                </div>

                {/* Bottom Marquee - Moving Left */}
                <div className="flex overflow-hidden py-4 bg-primary-100/30 backdrop-blur-sm border-y border-primary-100/50 rotate-[2deg] scale-110 mt-2">
                    <div className="flex animate-marquee whitespace-nowrap shrink-0">
                        <span className="text-4xl md:text-6xl font-body text-primary-800 mx-8">PENGIRIMAN CEPAT • LAYANAN 24 JAM • FLORIST TERPERCAYA • HADIAH SEMPURNA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-800 mx-8">PENGIRIMAN CEPAT • LAYANAN 24 JAM • FLORIST TERPERCAYA • HADIAH SEMPURNA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-800 mx-8">PENGIRIMAN CEPAT • LAYANAN 24 JAM • FLORIST TERPERCAYA • HADIAH SEMPURNA •</span>
                    </div>
                    <div className="flex animate-marquee whitespace-nowrap shrink-0">
                        <span className="text-4xl md:text-6xl font-body text-primary-800 mx-8">PENGIRIMAN CEPAT • LAYANAN 24 JAM • FLORIST TERPERCAYA • HADIAH SEMPURNA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-800 mx-8">PENGIRIMAN CEPAT • LAYANAN 24 JAM • FLORIST TERPERCAYA • HADIAH SEMPURNA •</span>
                        <span className="text-4xl md:text-6xl font-body text-primary-800 mx-8">PENGIRIMAN CEPAT • LAYANAN 24 JAM • FLORIST TERPERCAYA • HADIAH SEMPURNA •</span>
                    </div>
                </div>
            </section>

            {/* Categories Scroller */}
            <section className="min-h-screen flex flex-col justify-center bg-secondary/20 overflow-hidden snap-start py-20">
                <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4 font-magnetik-light">Jelajahi Kategori</h2>
                    </div>
                    <Button variant="ghost" className="hidden md:flex gap-2 text-primary-700 hover:text-primary-900 text-lg" asChild>
                        <Link href="/shop">Lihat Semua <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>

                <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
                    {/* Simple Marquee-like grid for categories */}
                    {/* Grid for categories - 2 rows */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {categories.slice(0, 10).map((cat, idx) => (
                            <Link href={`/shop?category=${encodeURIComponent(cat)}`} key={idx} className="group relative w-full h-48 md:h-60 rounded-2xl overflow-hidden bg-primary-100/70 border border-primary-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100/70 to-primary-200/60 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary-200/70 blur-xl" />

                                <div className="relative z-10 h-full p-4 md:p-6 flex flex-col justify-between">
                                    {(() => {
                                        const Icon = categoryIcons[cat] ?? fallbackIcons[idx % fallbackIcons.length];
                                        return (
                                            <div className="text-primary-700">
                                                <Icon className="w-11 h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                                            </div>
                                        );
                                    })()}

                                    <div>
                                        <h3 className="font-heading text-lg md:text-2xl font-bold text-primary-900 group-hover:-translate-y-1 transition-transform duration-300 line-clamp-2">{cat}</h3>
                                        <span className="text-primary-700 text-xs md:text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Lihat Koleksi</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Button variant="link" className="text-primary-700" asChild>
                            <Link href="/shop">Lihat Semua Kategori <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="min-h-screen flex flex-col justify-center bg-white snap-start py-20">
                <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4 font-magnetik-light">Bunga Untukmu</h2>
                </div>

                <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredBouquets.slice(0, 8).map((bouquet) => (
                            <BouquetCard key={bouquet.id} bouquet={bouquet} />
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <Button 
                            size="sm"
                            variant="outline" 
                            className="rounded-full px-8 py-4 text-base border-primary-200 text-primary-900 transition-all duration-200 hover:bg-primary-100 hover:text-primary-800 hover:scale-105 shadow-sm" 
                            asChild
                        >
                            <Link href="/shop">Lihat Semua Produk</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="min-h-screen flex items-center bg-secondary/10 snap-start py-32">
                <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                        {/* Left Side: Header */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-6">
                                Layanan Pelanggan
                            </span>
                            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-900 mb-8 leading-[0.9]">
                                Pertanyaan<br />
                                <span className="text-primary-500 font-magnetik-light">Umum</span>
                            </h2>
                            {/* <p className="font-body text-xl text-muted-foreground max-w-md leading-relaxed">
                                Temukan jawaban atas pertanyaan yang paling sering diajukan mengenai layanan florist kami. Kami siap membantu Anda.
                            </p> */}

                            <div className="mt-12 p-8 rounded-3xl bg-white border border-primary-100 shadow-sm hidden lg:block">
                                <p className="font-body text-primary-900 font-bold mb-2">Masih punya pertanyaan?</p>
                                <p className="font-body text-muted-foreground mb-6">Tim kami siap membantu melalui WhatsApp 24/7.</p>
                                <Button className="w-full rounded-full bg-primary-800 hover:bg-primary-900 h-14 text-white text-lg">
                                    Hubungi Kami
                                </Button>
                            </div>
                        </div>

                        {/* Right Side: Accordion */}
                        <div className="lg:col-span-7 space-y-6">
                            {[
                                {
                                    q: "Apakah bunga yang dikirim selalu segar?",
                                    a: "Tentu saja! Kami hanya menggunakan bunga yang dipetik di hari yang sama dengan pengiriman Anda untuk memastikan kesegaran yang maksimal hingga ke tangan penerima."
                                },
                                {
                                    q: "Bisa kirim hari ini (Same Day Delivery)?",
                                    a: "Bisa! Kami melayani pengiriman di hari yang sama untuk pesanan yang masuk sebelum jam 14.00 WIB. Setelah jam tersebut, pesanan akan dikirim keesokan harinya."
                                },
                                {
                                    q: "Berapa biaya pengirimannya?",
                                    a: "Kami memberikan gratis biaya pengiriman untuk wilayah Jakarta Selatan. Untuk wilayah lain di Jabodetabek, biaya akan dihitung secara otomatis saat pembayaran."
                                },
                                {
                                    q: "Bagaimana jika bunga yang diterima rusak?",
                                    a: "Kepuasan Anda adalah prioritas kami. Jika bunga yang diterima dalam keadaan rusak berat, silakan hubungi kami dalam waktu 2 jam setelah diterima untuk klaim garansi penggantian baru."
                                },
                                {
                                    q: "Dapatkah saya memesan buket kustom?",
                                    a: "Sangat bisa! Silakan hubungi tim florist kami melalui WhatsApp untuk berkonsultasi mengenai desain, pilihan bunga, dan budget yang Anda inginkan."
                                }
                            ].map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    q={faq.q}
                                    a={faq.a}
                                    isOpen={openFaqIndex === i}
                                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden snap-start py-20">
                <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-screen-2xl">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold tracking-wider uppercase mb-6">
                            Keunggulan Kami
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 font-magnetik-light">
                            Mengapa Memilih Ramz Florist?
                        </h2>
                        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Komitmen kami adalah memberikan bunga terbaik dengan layanan sepenuh hati untuk setiap momen spesial Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />,
                                title: "Kualitas Terjamin",
                                desc: "Setiap batang bunga melewati proses quality control ketat untuk memastikan kesegaran yang tahan lama."
                            },
                            {
                                icon: <Truck className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />,
                                title: "Pengiriman Cepat",
                                desc: "Layanan pengiriman aman dan tepat waktu untuk wilayah Jakarta dan sekitarnya."
                            },
                            {
                                icon: <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />,
                                title: "Dibuat dengan Cinta",
                                desc: "Dirangkai oleh tangan ahli yang berpengalaman dengan perhatian penuh pada setiap detail."
                            },
                            {
                                icon: <Star className="w-8 h-8 md:w-10 md:h-10 text-primary-600" />,
                                title: "Desain Eksklusif",
                                desc: "Rangkaian bunga modern dan estetis yang dirancang khusus untuk memukau penerimanya."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-secondary/10 border border-primary-100 hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300 text-center hover:-translate-y-2">
                                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="font-heading text-xl md:text-2xl font-bold text-primary-900 mb-4">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button 
                            className="rounded-full px-10 py-7 text-lg bg-primary-800 text-white hover:bg-primary-900 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            asChild
                        >
                            <Link href="/shop">Mulai Pesan Sekarang</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 3l1.7 3.8L18 8.5l-3.3 2.3.8 3.9-3.5-2-3.5 2 .8-3.9L6 8.5l4.3-1.7L12 3z" />
            <path d="M19 15l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7z" />
        </svg>
    );
}

function BalloonIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 3c-3.3 0-6 2.6-6 5.9 0 3.1 2.1 5.6 5 6.2v2.4l-1.2 2.1h4.4L13 17.5V15c2.9-.6 5-3.1 5-6.2C18 5.6 15.3 3 12 3z" />
            <path d="M12 20.5V22" />
        </svg>
    );
}

function ButterflyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 11c-2-3.5-5.5-4.8-7.5-3S3 13.5 6 15s4.5-.5 6-4z" />
            <path d="M12 11c2-3.5 5.5-4.8 7.5-3S21 13.5 18 15s-4.5-.5-6-4z" />
            <path d="M12 11c-2 3.5-1.8 6.8.5 7.8 2.3 1 4.4-1.4 3.5-4.3-.7-2.3-2.2-3.2-4-3.5z" />
            <path d="M12 11c2 3.5 1.8 6.8-.5 7.8-2.3 1-4.4-1.4-3.5-4.3.7-2.3 2.2-3.2 4-3.5z" />
            <path d="M12 4v7" />
        </svg>
    );
}

function MoneyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <circle cx="12" cy="12" r="2.5" />
            <path d="M7 9.5h.01M17 14.5h.01" />
        </svg>
    );
}

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 4c-8.5 0-14 4.4-14 11.2 0 3.1 2.5 5.8 5.8 5.8 6.8 0 11.2-5.5 11.2-14z" />
            <path d="M8 16c2-2 4.2-3.9 7.5-5.5" />
        </svg>
    );
}
