"use client";
import BlossomingFlowers from "@/components/flowers/BlossomingFlowers";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Bouquet } from '@/components/bouquet-card';
import { ArrowRight, Star, Truck, ShieldCheck, Heart, ChevronDown } from 'lucide-react';
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
                className="w-full flex items-center justify-between py-3 md:py-4 px-6 md:px-8 text-left focus:outline-none group min-h-0"
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

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen w-full overflow-hidden bg-primary-100/30 flex items-center justify-center snap-start">
                {/* BlossomingFlowers as flower asset, centered bottom (removed) */}
                                {/* Rose background asset */}
                <div className="absolute inset-0 z-0">
                    {/* Abstract floral background shapes if no image */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-200/40 to-transparent rounded-l-full transform translate-x-1/3 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-pink-200/40 to-transparent rounded-r-full transform -translate-x-1/3 blur-3xl" />
                </div>

                <div className="container relative z-0 px-4 text-center animate-fade-in-up">
                    <h1 className="font-heading text-6xl md:text-9xl lg:text-[12rem] xl:text-[15rem] leading-none font-bold text-primary-900 tracking-[5px] uppercase">
                        Ramz Florist3
                    </h1>
                </div>
            </section>

            {/* Marquee Features Section */}
            <section className="min-h-screen flex flex-col justify-center bg-primary-100/20 py-20 overflow-hidden snap-start">
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
                <div className="container mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4 font-magnetik-light">Jelajahi Kategori</h2>
                    </div>
                    <Button variant="ghost" className="hidden md:flex gap-2 text-primary-700 hover:text-primary-900 text-lg" asChild>
                        <Link href="/shop">Lihat Semua <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>

                <div className="container mx-auto px-4">
                    {/* Simple Marquee-like grid for categories */}
                    {/* Grid for categories - 2 rows */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {categories.slice(0, 10).map((cat, idx) => (
                            <Link href={`/shop?category=${encodeURIComponent(cat)}`} key={idx} className="group relative w-full h-48 md:h-60 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent z-10 flex flex-col justify-end p-4 md:p-6">
                                    <h3 className="font-heading text-xl md:text-2xl font-bold text-white group-hover:-translate-y-1 transition-transform duration-300 line-clamp-2">{cat}</h3>
                                    <span className="text-white/90 text-xs md:text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Lihat Koleksi</span>
                                </div>
                                {/* Placeholder for category image */}
                                <div className="absolute inset-0 bg-primary-100 group-hover:scale-110 transition-transform duration-700" />
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
                <div className="container mx-auto px-4 text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4 font-magnetik-light">Favorit Kami</h2>
                </div>

                <div className="container mx-auto px-4">
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
                <div className="container mx-auto px-4">
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

            {/* CTA / Newsletter */}
            <section className="min-h-screen flex items-center justify-center bg-primary-900 text-white relative overflow-hidden snap-start py-20">
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-primary-500/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">Siap Membuat<br />Seseorang Tersenyum?</h2>
                    <p className="text-primary-100 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Pesan sekarang dan dapatkan diskon 10% untuk pembelian pertama dengan kode <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-lg ml-1">BLOOM10</span>
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto w-full">
                        <input
                            type="email"
                            placeholder="Masukkan alamat email Anda"
                            className="flex-1 px-8 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
                        />
                        <Button className="rounded-full px-10 py-8 bg-white text-primary-900 hover:bg-primary-50 font-bold text-lg">
                            Berlangganan
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
