const fs = require('fs');

const content = `"use client";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Search } from "lucide-react";

import { CategorySidebar } from '@/components/category-sidebar';
import { BouquetCard, Bouquet } from '@/components/bouquet-card';

export default function ShopPage() {
  const [categories, setCategories] = useState([]);
  const [bouquets, setBouquets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const catsRes = await fetch("/api/categories");
      const cats = await catsRes.json();
      setCategories(cats);
      const bqsRes = await fetch("/api/bouquets");
      const bqs = await bqsRes.json();
      setBouquets(bqs);
    })();
  }, []);

  const filteredBouquets = bouquets.filter((b) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="container mx-auto max-w-screen-2xl px-4 md:px-6 py-8">
      {/* Mobile Actions: Filter + Search */}
      <div className="md:hidden flex flex-col gap-4 mb-6">
        <div className="flex gap-2">
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 shrink-0 md:hidden">
                <Filter className="h-4 w-4" /> Kategori
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <div className="py-6">
                <h3 className="font-heading text-xl font-bold text-primary-900 mb-6">Kategori</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={selectedCategory === 'All' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => { setSelectedCategory('All'); setIsMobileFilterOpen(false); }}
                  >
                    Semua Buket
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'ghost'}
                      className="justify-start"
                      onClick={() => { setSelectedCategory(cat); setIsMobileFilterOpen(false); }}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari buket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full bg-white/50"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar kiri - hidden di mobile */}
        <aside className="hidden md:block w-full md:w-1/4 lg:w-[25%] shrink-0">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </aside>
        
        {/* Konten kanan: grid bouquet */}
        <section className="flex-1">
          {/* Desktop Search */}
          <div className="hidden md:block relative w-full max-w-sm mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari buket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredBouquets.length > 0 ? (
              filteredBouquets.map((bouquet) => (
                <BouquetCard key={bouquet.id} bouquet={bouquet} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                Buket tidak ditemukan. Coba pencarian atau kategori lain.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
`;

fs.writeFileSync('app/shop/page.tsx', content);
