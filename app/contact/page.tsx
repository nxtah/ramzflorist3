import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Though we might move away from Card for a cleaner look
import { MapPin, Phone, Mail, Clock, Send, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-secondary/20 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-900">
            Mari Berbincang
          </h1>
          <p className="font-body text-xl text-muted-foreground">
            Punya pertanyaan tentang pesanan atau butuh rangkaian khusus? Kami ingin mendengar dari Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Contact Info Side */}
          <div className="space-y-10">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary-100/50">
              <h2 className="font-heading text-2xl font-bold text-primary-900 mb-8 border-b border-gray-100 pb-4">
                Hubungi Kami
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900 mb-1">Kunjungi Toko Kami</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Jl. Bunga Melati No. 123<br />
                      Jakarta Selatan, Indonesia 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900 mb-1">Telepon Kami</h3>
                    <p className="text-muted-foreground mb-1">+62 812-3456-7890</p>
                    <p className="text-sm text-muted-foreground">Senin-Jumat dari jam 9 pagi sampai 6 sore</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900 mb-1">Email Kami</h3>
                    <p className="text-muted-foreground">hello@ramzflorist3.com</p>
                    <p className="text-sm text-muted-foreground">Kami akan merespon dalam 24 jam.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 justify-center md:justify-start">
              <Button variant="outline" size="lg" className="rounded-full gap-2 border-primary-200 text-primary-800 hover:bg-primary-50" asChild>
                <Link href="#">
                  <Instagram className="w-5 h-5" /> Ikuti Kami
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full gap-2 border-primary-200 text-primary-800 hover:bg-primary-50" asChild>
                <Link href="#">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-primary-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h2 className="font-heading text-2xl font-bold text-primary-900 mb-6 relative z-10">
              Kirim Pesan
            </h2>

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-800 ml-1">Nama Depan</label>
                  <Input placeholder="Jane" className="rounded-xl h-12 bg-secondary/20 border-primary-100 focus:ring-primary-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary-800 ml-1">Nama Belakang</label>
                  <Input placeholder="Doe" className="rounded-xl h-12 bg-secondary/20 border-primary-100 focus:ring-primary-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary-800 ml-1">Alamat Email</label>
                <Input type="email" placeholder="jane@example.com" className="rounded-xl h-12 bg-secondary/20 border-primary-100 focus:ring-primary-300" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary-800 ml-1">Subjek</label>
                <Input placeholder="Pertanyaan Pesanan" className="rounded-xl h-12 bg-secondary/20 border-primary-100 focus:ring-primary-300" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary-800 ml-1">Pesan</label>
                <Textarea placeholder="bagaimana kami bisa membantu Anda?" className="min-h-[150px] rounded-xl bg-secondary/20 border-primary-100 focus:ring-primary-300 resize-none" />
              </div>

              <Button size="lg" className="w-full rounded-xl h-12 text-lg bg-primary-800 hover:bg-primary-900 shadow-lg shadow-primary-500/20">
                Kirim Pesan <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
