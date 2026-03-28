const fs = require('fs');

const file = 'app/admin/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf-8');

const importReplacement = `import { Plus, Edit, Trash2, LogOut, Loader2, ImagePlus, LayoutDashboard, Flower2, Megaphone, Info, Search, FileText, AlertTriangle, TrendingUp, HelpCircle, UserCheck, Star } from "lucide-react";`;
content = content.replace(/import { Plus.*lucide-react";/, importReplacement);

const newOverview = `
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
              <h2 className="text-3xl font-heading text-primary">Dashboard Overview</h2>
              <p className="text-muted-foreground">Halo Admin, berikut ringkasan statistik toko bunga Anda hari ini.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background border rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Flower2 className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-heading text-foreground">{bouquets.length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Total Macam Buket</p>
                </div>
              </div>
              
              <div className="bg-background border rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-heading text-foreground">{totalStock}</p>
                  <p className="text-sm font-medium text-muted-foreground">Total Stok Barang</p>
                </div>
              </div>

              <div className="bg-background border rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                    <Megaphone className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-heading text-foreground">{bannerActive ? "ON" : "OFF"}</p>
                  <p className="text-sm font-medium text-muted-foreground">Status Banner Promo</p>
                </div>
              </div>

              <div className="bg-background border rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600">
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-heading text-foreground">{bouquets.filter(b => b.isFeatured).length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Buket Diunggulkan</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 space-y-4">
                <h3 className="font-heading text-xl text-primary flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Barang Hampir Habis</h3>
                <div className="bg-background rounded-2xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="p-4 font-semibold text-sm">Produk</th>
                          <th className="p-4 font-semibold text-sm">Kategori</th>
                          <th className="p-4 font-semibold text-sm text-right">Sisa Stok</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y relative">
                        {bouquets.filter(b => b.stock <= 5).slice(0, 5).length > 0 ? (
                           bouquets.filter(b => b.stock <= 5).sort((a,b) => a.stock - b.stock).slice(0, 5).map(b => (
                            <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                              <td className="p-4 font-medium text-sm flex items-center gap-3">
                                {b.images?.[0] ? <img src={b.images[0]} className="w-8 h-8 rounded object-cover" /> : <div className="w-8 h-8 bg-muted rounded" />}
                                {b.name}
                              </td>
                              <td className="p-4 text-muted-foreground text-sm">{b.category}</td>
                              <td className="p-4 text-right">
                                {b.stock === 0 ? (
                                   <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">Habis!</span>
                                ) : (
                                   <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded">{b.stock} Sisa</span>
                                )}
                              </td>
                            </tr>
                           ))
                        ) : (
                           <tr><td colSpan={3} className="p-8 text-center text-sm text-muted-foreground">Semua stok produk masih aman.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl text-primary flex items-center gap-2"><HelpCircle className="w-5 h-5" /> Panduan Singkat</h3>
                <div className="bg-background rounded-2xl shadow-sm border p-5 space-y-4">
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Kelola Buket</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">Anda bisa menambah, menghapus, atau mengubah rincian produk di tab Bouquets.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Promo Teks Berjalan</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">Aktifkan pengumuman penting yang akan tampil di ujung atas setiap halaman toko Anda.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Buket Featured</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">Centang "Featured" saat edit buket agar tampil di deretan produk rekomendasi halaman depan.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}
`;

content = content.replace(/{\/\* OVERVIEW TAB \*\/}[\s\S]*?(?={\/\* BOUQUETS TAB \*\/})/m, newOverview);

fs.writeFileSync(file, content);
