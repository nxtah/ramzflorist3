"use client";

import * as React from "react";
import { MessageCircle, Minus, Plus, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";

type BouquetOrderPanelProps = {
  bouquetName: string;
  bouquetPrice: number;
  bouquetStock: number;
  whatsappBaseUrl?: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function buildWhatsappUrl(baseUrl: string, message: string) {
  const fallback = "https://wa.me/6281234567890";
  const safeBase = baseUrl?.trim() || fallback;

  try {
    const url = new URL(safeBase);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return `${fallback}?text=${encodeURIComponent(message)}`;
  }
}

export function BouquetOrderPanel({
  bouquetName,
  bouquetPrice,
  bouquetStock,
  whatsappBaseUrl,
}: BouquetOrderPanelProps) {
  const maxQty = bouquetStock > 0 ? Math.min(bouquetStock, 99) : 0;
  const [quantity, setQuantity] = React.useState(maxQty > 0 ? 1 : 0);

  const subtotal = bouquetPrice * quantity;
  const adminFee = subtotal > 0 ? 0 : 0;
  const total = subtotal + adminFee;

  const waMessage = [
    "Halo Ramz Florist, saya ingin memesan bouquet berikut:",
    "",
    `Nama Bouquet: ${bouquetName}`,
    `Jumlah: ${quantity}`,
    `Harga Satuan: ${formatPrice(bouquetPrice)}`,
    `Total: ${formatPrice(total)}`,
    "",
    "Mohon dibantu untuk proses pemesanannya. Terima kasih.",
  ].join("\n");

  const waUrl = buildWhatsappUrl(whatsappBaseUrl || "", waMessage);

  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increment = () => setQuantity((prev) => Math.min(maxQty, prev + 1));

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-primary-100/70 p-5">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-200/50 blur-2xl" />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Atur Jumlah Pesanan</p>
            <p className="text-xs text-muted-foreground">Maksimum {maxQty || 0} bouquet</p>
          </div>

          <div className="flex items-center rounded-full border border-primary-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity <= 1 || maxQty === 0}
              className="h-11 w-11 rounded-l-full text-primary-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Kurangi jumlah"
            >
              <Minus className="mx-auto h-4 w-4" />
            </button>
            <div className="min-w-[56px] text-center text-xl font-bold text-primary-900">{quantity}</div>
            <button
              type="button"
              onClick={increment}
              disabled={quantity >= maxQty || maxQty === 0}
              className="h-11 w-11 rounded-r-full text-primary-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Tambah jumlah"
            >
              <Plus className="mx-auto h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-primary-300 bg-white p-5">
        <div className="mb-4 flex items-center gap-2 text-primary-800">
          <ReceiptText className="h-5 w-5" />
          <p className="font-semibold">Ringkasan Harga</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Harga satuan</span>
            <span>{formatPrice(bouquetPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Jumlah</span>
            <span>{quantity}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Biaya admin</span>
            <span>{formatPrice(adminFee)}</span>
          </div>
          <div className="my-2 h-px bg-primary-100" />
          <div className="flex items-center justify-between text-base font-bold text-primary-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {maxQty > 0 ? (
        <Button
          size="lg"
          className="h-14 w-full rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
          asChild
        >
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            Pesan via WhatsApp
          </a>
        </Button>
      ) : (
        <Button
          size="lg"
          className="h-14 w-full rounded-full bg-emerald-600 text-white"
          disabled
        >
          <MessageCircle className="h-5 w-5" />
          Stok Habis
        </Button>
      )}
    </div>
  );
}
