'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Koleksi', href: '/shop' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kontak', href: '/contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const pathname = usePathname();

    React.useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if scrolling up or at the top
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setIsVisible(true);
            }
            // Hide if scrolling down and past threshold
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b border-primary-100/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-transform duration-300",
                !isVisible ? "-translate-y-full" : "translate-y-0"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-heading text-xl font-bold tracking-wider text-primary-800">
                            RAMZ <span className=" font-magnetik-light">FLORIST3</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-600 font-body tracking-wide",
                                    pathname === item.href ? "text-primary-800 font-semibold" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-primary-800"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden border-t bg-white">
                    <div className="container py-4 px-4 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-600 font-body py-2 border-b border-dashed border-gray-100",
                                    pathname === item.href ? "text-primary-800 font-semibold" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}

                    </div>
                </div>
            )}
        </header>
    );
}
