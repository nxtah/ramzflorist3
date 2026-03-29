const fs = require('fs');
let s = fs.readFileSync('components/store-interface.tsx', 'utf8');

const oldStr = `            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
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
                </div>`;

const newStr = `            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Mobile Filter & Search Trigger */}
                <div className="md:hidden flex flex-col gap-4 mb-2">
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
                </div>`;

fs.writeFileSync('components/store-interface.tsx', s.replace(oldStr, newStr));
