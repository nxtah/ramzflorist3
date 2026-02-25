import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { readBouquets } from '@/lib/json-db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BouquetCard } from '@/components/bouquet-card';
import { ArrowLeft, MessageCircle, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  const bouquets = await readBouquets();
  return bouquets.map((b: any) => ({ id: String(b.id) }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bouquets = await readBouquets();
  const bouquetId = parseInt(id);
  const bouquet = bouquets.find((b: any) => b.id === bouquetId);

  if (!bouquet) {
    return notFound();
  }

  // Find related products (same category, exclude current)
  const relatedBouquets = bouquets
    .filter((b: any) => b.category === bouquet.category && b.id !== bouquetId)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Breadcrumb / Back Link */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary w-full shadow-sm border border-primary-100/50">
            <Image
              src={(bouquet.images && bouquet.images.length > 0 ? bouquet.images[0] : '/placeholder-flower.jpg')}
              alt={bouquet.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {bouquet.stock <= 0 && (
              <div className="absolute top-4 left-4 z-20">
                <Badge variant="destructive" className="text-lg px-4 py-2">Sold Out</Badge>
              </div>
            )}
          </div>
          {/* Thumbnails (for multiple images in future) */}
          {bouquet.images && bouquet.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {bouquet.images.map((img: string, idx: number) => (
                <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary-500 transition-all flex-shrink-0">
                  <Image
                    src={img}
                    alt={`${bouquet.name} thumb ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit mb-4 text-primary-700 bg-primary-50 font-semibold px-3 py-1">
            {bouquet.category}
          </Badge>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-900 mb-4 leading-tight">
            {bouquet.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-3xl font-bold text-primary-800">
              {formatPrice(bouquet.price)}
            </span>
            {bouquet.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(bouquet.originalPrice)}
              </span>
            )}
          </div>

          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8 border-b border-dashed border-primary-100 pb-8">
            {bouquet.description || "A beautiful arrangement suitable for any occasion."}
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 rounded-full text-lg h-14 bg-primary-800 hover:bg-primary-900 shadow-lg shadow-primary-500/20" disabled={bouquet.stock <= 0}>
                <ShoppingBag className="w-5 h-5 mr-3" />
                {bouquet.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button size="lg" variant="outline" className="flex-1 rounded-full text-lg h-14 border-primary-200 text-primary-800 hover:bg-primary-50">
                <MessageCircle className="w-5 h-5 mr-3" />
                Chat via WhatsApp
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                <Truck className="w-5 h-5 text-primary-600" />
                <span>Same-day Delivery</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                <ShieldCheck className="w-5 h-5 text-primary-600" />
                <span>Freshness Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedBouquets.length > 0 && (
        <div className="border-t border-primary-100 pt-16">
          <h2 className="font-heading text-3xl font-bold text-primary-900 mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedBouquets.map((b: any) => (
              <BouquetCard key={b.id} bouquet={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
