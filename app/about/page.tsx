import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-50 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="outline" className="mb-6 border-primary-300 text-primary-800 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-sm uppercase tracking-widest">
            Kisah Kami
          </Badge>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold text-primary-900 mb-6">
            Merangkai Emosi <br />
            <span className="italic font-serif font-light text-primary-600">Melalui Bunga</span>
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Ramz Florist berawal dari keyakinan sederhana: bahwa bunga adalah bahasa universal cinta, perayaan, dan kenyamanan.
          </p>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-secondary rounded-3xl overflow-hidden shadow-2xl transform md:rotate-3 transition-transform hover:rotate-0 duration-700">
                {/* Placeholder for About Image */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-muted-foreground">
                  [Gambar Florist Bekerja]
                </div>
              </div>
              {/* Decorative Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <p className="font-heading font-bold text-4xl text-primary-800 mb-2">5+</p>
                <p className="text-sm text-muted-foreground">Tahun menebar senyum melalui rangkaian bunga buatan tangan.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900">
                  Lebih Dari Sekadar Toko Bunga
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kami adalah seniman, pemimpi, dan pencerita. Setiap buket yang kami buat dirancang untuk mengabadikan momen, baik itu perayaan pernikahan yang megah atau ungkapan simpati yang tulus.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Komitmen kami terhadap kualitas berarti kami hanya mengambil bunga paling segar, seringkali dari petani lokal, memastikan rangkaian Anda tetap indah lebih lama.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-secondary/30 border border-primary-100">
                  <h3 className="font-heading text-xl font-bold text-primary-800 mb-2">Buatan Tangan</h3>
                  <p className="text-muted-foreground">Setiap rangkaian unik dan dibuat dengan perhatian personal.</p>
                </div>
                <div className="p-6 rounded-2xl bg-secondary/30 border border-primary-100">
                  <h3 className="font-heading text-xl font-bold text-primary-800 mb-2">Segar Setiap Hari</h3>
                  <p className="text-muted-foreground">Kami menyetok ulang bunga kami setiap pagi untuk kesegaran maksimal.</p>
                </div>
              </div>

              <div className="pt-8">
                <Button size="lg" className="rounded-full px-8 bg-primary-800 text-white hover:bg-primary-900" asChild>
                  <Link href="/contact">Hubungi Kami</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Values Section could go here */}
    </main>
  );
}
