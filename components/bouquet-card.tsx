'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export interface Bouquet {
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
}

interface BouquetCardProps {
    bouquet: Bouquet;
}

export function BouquetCard({ bouquet }: BouquetCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Card className="group overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-lg hover:shadow-[0_8px_32px_rgba(156,39,176,0.10)] transition-all duration-300 flex flex-col relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Link href={`/bouquet/${bouquet.id}`} className="block w-full h-full">
                    <Image
                        src={bouquet.images && bouquet.images.length > 0 ? bouquet.images[0] : '/placeholder-flower.jpg'}
                        alt={bouquet.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-95"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/90 via-white/40 to-transparent z-10" />
                </Link>
                {bouquet.stock <= 0 && (
                    <div className="absolute top-3 left-3 z-20">
                        <Badge variant="destructive" className="bg-red-500/90 hover:bg-red-600 border-none text-white px-3 py-1 text-xs shadow">Sold Out</Badge>
                    </div>
                )}
            </div>
            <CardFooter className="flex flex-col gap-2 items-start p-4 md:p-5 pt-3 md:pt-4 flex-1 w-full">
                <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-1 md:gap-2 mb-1">
                    <Badge variant="secondary" className="bg-primary-50 text-primary-700 hover:bg-primary-100 text-[10px] uppercase tracking-wider font-semibold border-none px-2 py-0.5 w-fit">
                        {bouquet.category}
                    </Badge>
                    <span className="font-heading font-bold text-lg md:text-2xl text-primary-900 mt-1 md:mt-0">
                        {formatPrice(bouquet.price)}
                    </span>
                </div>
                <h3 className="font-body text-sm md:text-base font-semibold text-charcoal group-hover:text-primary-700 transition-colors line-clamp-2" title={bouquet.name}>
                    <Link href={`/bouquet/${bouquet.id}`}>{bouquet.name}</Link>
                </h3>
            </CardFooter>
            <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-4 group-hover:ring-primary-200/40 transition-all duration-300 pointer-events-none" />
        </Card>
    );
}
