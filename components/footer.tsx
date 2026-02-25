'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-primary-900 text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-800/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-[30%] right-[0%] w-[40%] h-[60%] bg-pink-500/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container relative z-10 mx-auto px-4 pt-20 pb-10 md:pt-32 md:pb-12 h-full flex flex-col justify-between min-h-[90vh] md:min-h-[auto]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full">
                        <div className="mb-8">
                            <span className="inline-block py-1 px-3 rounded-full border border-white/20 text-white/80 text-xs font-semibold tracking-wider uppercase mb-6">
                                Berdiri Sejak 2024
                            </span>
                            <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-6">
                                RAMZ<br />
                                <span className="text-primary-300 italic">FLORIST3</span>
                            </h2>
                            <p className="font-body text-xl text-white/70 max-w-md">
                                Merangkai bunga abadi yang menyuarakan bahasa emosi.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full bg-transparent border-white/30 text-white hover:bg-white hover:text-primary-900 transition-all text-lg h-14 px-8"
                                asChild
                            >
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="mr-2 w-5 h-5" /> Instagram
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full bg-transparent border-white/30 text-white hover:bg-white hover:text-primary-900 transition-all text-lg h-14 px-8"
                                asChild
                            >
                                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-3 lg:col-start-8">
                        <h3 className="font-body text-sm font-semibold text-white/50 uppercase tracking-widest mb-8">Menu</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Beranda', href: '/' },
                                { name: 'Koleksi Toko', href: '/shop' },
                                { name: 'Tentang Kami', href: '/about' },
                                { name: 'Kontak', href: '/contact' },
                                { name: 'Syarat Layanan', href: '#' },
                                { name: 'Kebijakan Privasi', href: '#' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="font-heading text-3xl md:text-4xl text-white hover:text-primary-300 hover:pl-4 transition-all duration-300 flex items-center group"
                                    >
                                        {item.name}
                                        <ArrowUpRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm font-body">
                    <p>&copy; {new Date().getFullYear()} Ramz Florist. Hak cipta dilindungi.</p>
                    <div className="flex gap-8">
                        <span>Dibuat dengan Cinta</span>
                        <span>Jakarta, Indonesia</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
