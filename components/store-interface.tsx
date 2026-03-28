'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CategorySidebar } from '@/components/category-sidebar';
import { BouquetCard, Bouquet } from '@/components/bouquet-card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

interface StoreInterfaceProps {
    categories: string[];
    initialBouquets: Bouquet[];
}

export default function StoreInterface({ categories, initialBouquets }: StoreInterfaceProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Initialize from URL or default to 'All'
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Sync from URL to State
    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) {
            setSelectedCategory(cat);
        } else {
            setSelectedCategory('All');
        }
    }, [searchParams]);

    // Cleanup: Function to update both state and URL
    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        const params = new URLSearchParams(searchParams.toString());
        if (cat === 'All') {
            params.delete('category');
        } else {
            params.set('category', cat);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter bouquets based on selection
    const filteredBouquets = useMemo(() => {
        if (selectedCategory === 'All') {
            return initialBouquets;
        }
        return initialBouquets.filter(b => b.category === selectedCategory);
    }, [selectedCategory, initialBouquets]);

    return (
        <div className="container mx-auto max-w-screen-2xl px-6 py-8 md:py-12">
            {/* Hero / Header Section */}
            <div className="text-center mb-12 md:mb-16 space-y-4">
                <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-900">
                    Bunga Pilihan
                </h1>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                    Jelajahi koleksi eksklusif buket buatan tangan kami, dirancang untuk menyampaikan emosi terdalam Anda.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Mobile Filter Trigger */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <span className="font-semibold text-primary-900">{filteredBouquets.length} Hasil</span>
                    <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                            <div className="py-6">
                                <h3 className="font-heading text-xl font-bold text-primary-900 mb-6">Kategori</h3>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant={selectedCategory === 'All' ? 'default' : 'ghost'}
                                        className="justify-start"
                                        onClick={() => { handleCategoryChange('All'); setIsMobileFilterOpen(false); }}
                                    >
                                        Semua Buket
                                    </Button>
                                    {categories.map(cat => (
                                        <Button
                                            key={cat}
                                            variant={selectedCategory === cat ? 'default' : 'ghost'}
                                            className="justify-start"
                                            onClick={() => { handleCategoryChange(cat); setIsMobileFilterOpen(false); }}
                                        >
                                            {cat}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Sidebar (30% width roughly) */}
                <aside className="hidden md:block w-full md:w-1/4 lg:w-[25%] shrink-0">
                    <CategorySidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryChange}
                    />
                </aside>

                {/* Main Product Grid (60-70% width) */}
                <main className="flex-1">
                    {/* Desktop Results Count */}
                    <div className="hidden md:flex justify-between items-center mb-6 border-b border-primary-100 pb-4">
                        <span className="text-muted-foreground">Menampilkan <span className="font-semibold text-primary-900">{filteredBouquets.length}</span> hasil</span>
                        {/* Additional sorts could go here */}
                    </div>

                    {filteredBouquets.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                            {filteredBouquets.map((bouquet) => (
                                <BouquetCard key={bouquet.id} bouquet={bouquet} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-secondary/50 rounded-2xl border border-dashed border-primary-200">
                            <p className="text-lg text-muted-foreground">Tidak ada buket ditemukan dalam kategori ini.</p>
                            <Button
                                variant="link"
                                onClick={() => handleCategoryChange('All')}
                                className="text-primary-600 mt-2"
                            >
                                Lihat semua buket
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
