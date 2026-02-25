
"use client";
// Shop page layout for RAMZ FLORIST3


import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Hapus import fs-based data access, gunakan fetch ke API
import { CategorySidebar } from '@/components/category-sidebar';
import { BouquetCard, Bouquet } from '@/components/bouquet-card';





import { useEffect, useState } from 'react';

export default function ShopPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  const filteredBouquets = selectedCategory === 'All'
    ? bouquets
    : bouquets.filter((b) => b.category === selectedCategory);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar kiri */}
        <aside className="md:w-1/4 w-full">
          <CategorySidebar categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </aside>
        {/* Konten kanan: grid bouquet */}
        <section className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBouquets.map((bouquet) => (
              <BouquetCard key={bouquet.id} bouquet={bouquet} />
            ))}
          </div>
        </section>
      </div>
      {/* Pagination */}
      <section className="flex justify-center mt-10">
        {/* <Pagination /> */}
      </section>
    </main>
  );
}
