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
        <Card className="group overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-transparent">
            <CardContent className="p-0 relative aspect-square overflow-hidden bg-transparent">
                {bouquet.stock <= 0 && (
                    <div className="absolute top-3 left-3 z-20">
                        <Badge variant="destructive" className="bg-red-500/90 hover:bg-red-600 border-none text-white px-3 py-1">Sold Out</Badge>
                    </div>
                )}

                <Link href={`/bouquet/${bouquet.id}`} className="block relative w-full h-full">
                    <Image
                        src={(bouquet.images && bouquet.images.length > 0 ? bouquet.images[0] : '/placeholder-flower.jpg')}
                        alt={bouquet.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
                {/* Gradient overlay for text readability on hover if needed, though clean is better */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-5">
                <div className="flex w-full items-center justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="bg-primary-50 text-primary-700 hover:bg-primary-100 text-[10px] uppercase tracking-wider font-semibold border-none px-2 py-0.5">
                        {bouquet.category}
                    </Badge>
                    <span className="font-heading font-bold text-2xl md:text-3xl text-primary-900">
                        {formatPrice(bouquet.price)}
                    </span>
                </div>
                <h3 className="font-body text-base font-semibold text-charcoal group-hover:text-primary-700 transition-colors line-clamp-1 pl-[0.5rem]" title={bouquet.name}>
                    <Link href={`/bouquet/${bouquet.id}`}>
                        {bouquet.name}
                    </Link>
                </h3>
                {/* <p className="text-sm text-muted-foreground mt-1 line-clamp-2">Beautiful arrangement of fresh flowers...</p> */}
            </CardFooter>
        </Card>
    );
}
