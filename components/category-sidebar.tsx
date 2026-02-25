'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CategorySidebarProps {
    categories: string[];
    selectedCategory?: string;
    onSelectCategory: (category: string) => void;
}

export function CategorySidebar({ categories, selectedCategory, onSelectCategory }: CategorySidebarProps) {
    return (
        <div className="hidden md:block w-full sticky top-24 self-start space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary-100/50">
                <h3 className="font-heading text-xl font-bold text-primary-900 mb-6 border-b border-primary-100 pb-4">
                    Collections
                </h3>
                <ul className="space-y-3">
                    <li>
                        <button
                            onClick={() => onSelectCategory('All')}
                            className={cn(
                                "w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 group flex items-center justify-between",
                                !selectedCategory || selectedCategory === 'All'
                                    ? "bg-primary-50 text-primary-800 font-semibold shadow-sm"
                                    : "text-muted-foreground hover:bg-secondary hover:text-primary-700"
                            )}
                        >
                            <span>All Bouquets</span>
                            {(!selectedCategory || selectedCategory === 'All') && <ChevronRight className="w-4 h-4 text-primary-400" />}
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat}>
                            <button
                                onClick={() => onSelectCategory(cat)}
                                className={cn(
                                    "w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 group flex items-center justify-between",
                                    selectedCategory === cat
                                        ? "bg-primary-50 text-primary-800 font-semibold shadow-sm"
                                        : "text-muted-foreground hover:bg-secondary hover:text-primary-700"
                                )}
                            >
                                <span>{cat}</span>
                                {selectedCategory === cat && <ChevronRight className="w-4 h-4 text-primary-400" />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-primary-500/10 rounded-2xl p-6 text-center">
                <h4 className="font-heading text-lg font-bold text-primary-900 mb-2">Need Custom Request?</h4>
                <p className="text-sm text-primary-800/80 mb-4">We can create a unique bouquet just for you.</p>
                <Link href="/contact" className="text-sm font-semibold text-primary-700 hover:text-primary-900 underline underline-offset-4">
                    Contact Us
                </Link>
            </div>
        </div>
    );
}
