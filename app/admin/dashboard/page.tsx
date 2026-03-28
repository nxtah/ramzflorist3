"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, LogOut, Loader2, ImagePlus, LayoutDashboard, Flower2, Megaphone, Info, Search, FileText, AlertTriangle, TrendingUp, HelpCircle, UserCheck, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Bouquet = {
  id?: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  description: string;
  isFeatured: boolean;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<"overview"|"bouquets"|"banner"|"info">("overview");

  // Bouquets State
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Bouquet Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  // Upload & Action States
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Config States (Banner & Info)
  const [bannerText, setBannerText] = useState("");
  const [bannerActive, setBannerActive] = useState(false);
  const [aboutImages, setAboutImages] = useState<string[]>([]);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.push("/admin/login");
    } else {
      setToken(t);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [resBouquets, resConfig, resCategories] = await Promise.all([
        fetch("/api/bouquets"),
        fetch("/api/config"),
        fetch("/api/categories")
      ]);
      const dataB = await resBouquets.json();
      const dataC = await resConfig.json();
      const dataCats = await resCategories.json();
      
      setBouquets(dataB || []);
      setCategories(dataCats || []);
      
      if (dataC) {
        if (dataC.banner) {
          setBannerText(dataC.banner.text || "");
          setBannerActive(dataC.banner.isActive || false);
        }
        if (dataC.about && dataC.about.images) {
          setAboutImages(dataC.about.images);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  /* ================= BOUQUETS LOGIC ================= */
  const handleAddCategory = async () => {
    const newCat = window.prompt("Masukkan nama kategori baru:");
    if (!newCat?.trim()) return;
    
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ category: newCat }),
      });
      if (!res.ok) throw new Error("Gagal menambah kategori");
      const updatedCats = await res.json();
      setCategories(updatedCats);
      setCategory(newCat.trim());
      alert("Kategori berhasil ditambahkan!");
    } catch (err) {
      alert("Gagal menambahkan kategori");
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setName(""); setPrice(""); setStock(""); setCategory(categories.length > 0 ? categories[0] : "");
    setDescription(""); setIsFeatured(false); setImages([]);
    setIsModalOpen(true);
  };

  const openEditModal = (b: Bouquet) => {
    setEditingId(b.id!);
    setName(b.name); setPrice(b.price.toString()); setStock(b.stock.toString()); setCategory(b.category);
    setDescription(b.description || ""); setIsFeatured(b.isFeatured || false); setImages(b.images || []);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this bouquet?")) return;
    try {
      await fetch(`/api/bouquets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleSaveBouquet = async () => {
    if (!name || !price || !stock || !category || images.length === 0) {
      alert("Please fill all required fields and upload at least one image.");
      return;
    }
    setSaving(true);
    const body = {
      name, price: Number(price), stock: Number(stock), category, description, isFeatured, images,
    };
    try {
      const endpoint = editingId ? `/api/bouquets/${editingId}` : "/api/bouquets";
      const method = editingId ? "PUT" : "POST";
      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Failed to save bouquet");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UPLOAD LOGIC ================= */
  const doUploadImages = async (files: File[], cat: string) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    formData.append("category", cat);
    
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return await res.json();
  };

  const handleBouquetImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    try {
      const data = await doUploadImages(Array.from(e.target.files), category);
      setImages(prev => [...prev, ...data.urls]);
    } catch (err) {
      alert("Failed to upload image");
    } finally {
      setUploading(false); e.target.value = "";
    }
  };

  const handleInfoImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    try {
      const data = await doUploadImages(Array.from(e.target.files), "about-us");
      setAboutImages(prev => [...prev, ...data.urls]);
    } catch (err) {
      alert("Failed to upload image");
    } finally {
      setUploading(false); e.target.value = "";
    }
  };

  /* ================= CONFIG LOGIC ================= */
  const saveConfig = async (updates: any) => {
    setSaving(true);
    try {
      await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
      alert("Changes saved successfully!");
    } catch (err) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };



  // Filtered bouquets
  const filteredBouquets = useMemo(() => {
    if (!searchTerm) return bouquets;
    return bouquets.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [bouquets, searchTerm]);

  const totalStock = bouquets.reduce((acc, b) => acc + b.stock, 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen bg-muted/40 font-body flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-background border-r p-6 md:min-h-screen sticky top-0 md:flex flex-col">
        <div className="mb-8 flex items-center justify-between md:justify-center">
          <h1 className="text-2xl font-heading text-primary">Admin Panel</h1>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="md:hidden text-destructive">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
          <button onClick={() => setActiveTab("overview")} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-muted font-medium text-muted-foreground"}`}>
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab("bouquets")} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === "bouquets" ? "bg-primary text-primary-foreground" : "hover:bg-muted font-medium text-muted-foreground"}`}>
            <Flower2 className="w-5 h-5" /> Bouquets
          </button>
          <button onClick={() => setActiveTab("banner")} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === "banner" ? "bg-primary text-primary-foreground" : "hover:bg-muted font-medium text-muted-foreground"}`}>
            <Megaphone className="w-5 h-5" /> Banner Promo
          </button>
          <button onClick={() => setActiveTab("info")} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === "info" ? "bg-primary text-primary-foreground" : "hover:bg-muted font-medium text-muted-foreground"}`}>
            <Info className="w-5 h-5" /> Informasi Web
          </button>
        </nav>
        <div className="mt-auto hidden md:block">
          <Button variant="outline" onClick={handleLogout} className="w-full rounded-xl gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 max-w-6xl w-full">
        
        
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
                  <div className="overflow-x-auto scrollbar-hide">
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
{/* BOUQUETS TAB */}
        {activeTab === "bouquets" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background p-6 rounded-2xl shadow-sm border">
              <div>
                <h2 className="text-2xl font-heading text-primary">Manage Bouquets</h2>
                <p className="text-muted-foreground text-sm">Add, edit or delete your flower products here.</p>
              </div>
              <div className="flex w-full sm:w-auto gap-4">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search bouquets..." 
                    className="pl-9 rounded-full"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={openAddModal} className="rounded-full gap-2 shrink-0">
                  <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Bouquet</span>
                </Button>
              </div>
            </div>

            <div className="bg-background rounded-2xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="p-4 font-semibold text-sm">Image</th>
                      <th className="p-4 font-semibold text-sm">Name</th>
                      <th className="p-4 font-semibold text-sm">Category</th>
                      <th className="p-4 font-semibold text-sm">Price</th>
                      <th className="p-4 font-semibold text-sm">Stock</th>
                      <th className="p-4 font-semibold text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y relative">
                    {filteredBouquets.map((b) => (
                      <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          {b.images?.[0] ? (
                            <img src={b.images[0]} alt={b.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl" />
                          ) : (
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-xl flex items-center justify-center text-xs">No img</div>
                          )}
                        </td>
                        <td className="p-4 font-medium text-sm md:text-base">
                          {b.name} {b.isFeatured && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">Featured</span>}
                        </td>
                        <td className="p-4 text-muted-foreground text-sm">{b.category}</td>
                        <td className="p-4 text-sm whitespace-nowrap">Rp {b.price.toLocaleString("id-ID")}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${b.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {b.stock} in stock
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1 sm:space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(b)}>
                            <Edit className="w-4 h-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id!)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredBouquets.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No bouquets found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BANNER PROMO TAB */}
        {activeTab === "banner" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
            <div className="bg-background p-6 rounded-2xl shadow-sm border space-y-6">
              <div>
                <h2 className="text-2xl font-heading text-primary">Running Text Banner (Promo)</h2>
                <p className="text-muted-foreground text-sm mt-1">Ini adalah teks yang akan berjalan di paling atas website Anda.</p>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="bannerText">Teks Pengumuman/Promo</Label>
                    <Input 
                      id="bannerText" 
                      value={bannerText} 
                      onChange={e => setBannerText(e.target.value)} 
                      placeholder="Contoh: Dapatkan diskon 20% untuk semua mawar hari ini!" 
                    />
                 </div>
                 
                 <div className="flex items-center space-x-2 bg-muted/50 p-4 rounded-xl border">
                    <input 
                      type="checkbox" 
                      id="bannerActive" 
                      checked={bannerActive}
                      onChange={e => setBannerActive(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                    />
                    <div>
                      <Label htmlFor="bannerActive" className="cursor-pointer font-semibold text-base block">Aktifkan Banner</Label>
                      <p className="text-xs text-muted-foreground">Centang kotak ini jika ingin banner ditampilkan di website pengunjung.</p>
                    </div>
                </div>

                <Button 
                  onClick={() => saveConfig({ banner: { text: bannerText, isActive: bannerActive } })} 
                  disabled={saving} 
                  className="rounded-xl w-full sm:w-auto"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Save Banner Settings"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* INFORMASI TAB (ABOUT US IMAGES) */}
        {activeTab === "info" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
             <div className="bg-background p-6 rounded-2xl shadow-sm border space-y-6">
              <div>
                <h2 className="text-2xl font-heading text-primary">About Us Images</h2>
                <p className="text-muted-foreground text-sm mt-1">Ubah atau tambahkan gambar yang akan muncul di halaman "Tentang Kami".</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {aboutImages.map((url, i) => (
                    <div key={i} className="relative group aspect-[3/4] rounded-xl overflow-hidden border bg-muted">
                      <img src={url} alt={`about-${i}`} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setAboutImages(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-6 h-6 text-red-400" />
                      </button>
                    </div>
                  ))}
                  
                  <Label 
                    htmlFor="about-upload" 
                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    {uploading ? (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : (
                      <>
                        <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground font-medium">Add Photo</span>
                      </>
                    )}
                    <input 
                      id="about-upload" 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleInfoImageUpload}
                      disabled={uploading}
                    />
                  </Label>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => saveConfig({ about: { images: aboutImages } })} 
                    disabled={saving} 
                    className="rounded-xl w-full sm:w-auto"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Save About Us Images"}
                  </Button>
                </div>
              </div>
             </div>
          </div>
        )}

      </main>

      {/* COMPONENT Modal for Edit/Add Bouquet remains the same */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl font-body max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{editingId ? "Edit Bouquet" : "Add New Bouquet"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Rose Elegance" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="category">Category *</Label>
                  <button type="button" onClick={handleAddCategory} className="text-xs text-primary hover:underline font-medium">+ Tambah Kategori</button>
                </div>
                <select 
                  id="category"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rp) *</Label>
                <Input id="price" type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} placeholder="350000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input id="stock" type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} placeholder="10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="resize-none"
                placeholder="Brief description of the bouquet..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="isFeatured" 
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-primary accent-primary"
              />
              <Label htmlFor="isFeatured" className="cursor-pointer">Featured on homepage</Label>
            </div>

            <div className="space-y-4">
              <Label>Images *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((url, i) => (
                  <div key={i} className="relative group aspect-[1] rounded-xl overflow-hidden border">
                    <img src={url} alt={`img-${i}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                ))}
                
                <Label 
                  htmlFor="image-upload" 
                  className="aspect-[1] rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  ) : (
                    <>
                      <ImagePlus className="w-6 h-6 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground font-medium">Upload</span>
                    </>
                  )}
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={handleBouquetImageUpload}
                    disabled={uploading}
                  />
                </Label>
              </div>
            </div>

          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleSaveBouquet} disabled={saving || uploading} className="rounded-xl">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {editingId ? "Update Bouquet" : "Save Bouquet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
