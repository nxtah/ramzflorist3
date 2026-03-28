import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { readSiteConfig } from "@/lib/json-db";

export default async function AboutPage() {
  const config = await readSiteConfig();
  const aboutImages = config?.about?.images || [];
  
  // If no image uploaded, default to the existing one
  const imagesToShow = aboutImages.length > 0 ? aboutImages : ["/about-florist.jpg"];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="about-hero-surface relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="liquid-bg-layer" aria-hidden>
          <div className="about-hero-glow absolute inset-0 bg-gradient-to-br from-primary-100/70 via-transparent to-rose-100/60" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(124,58,237,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
          <svg className="about-hero-waves absolute inset-0 h-full w-full opacity-35" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="about-hero-wave-a" d="M-80 360C120 260 260 440 430 340C600 240 780 420 970 330C1090 272 1180 250 1280 290" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
            <path className="about-hero-wave-b" d="M-120 430C80 340 280 530 500 430C680 348 840 470 1020 392C1130 345 1220 340 1320 370" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div
            className="liquid-blob liquid-blob-a about-blob"
            style={{
              opacity: 0.95,
              filter: "blur(56px)",
              background: "radial-gradient(circle at 30% 30%, rgba(192,132,252,0.74), rgba(192,132,252,0.18))",
            }}
          />
          <div
            className="liquid-blob liquid-blob-b about-blob"
            style={{
              opacity: 0.9,
              filter: "blur(62px)",
              background: "radial-gradient(circle at 45% 40%, rgba(244,114,182,0.72), rgba(244,114,182,0.14))",
            }}
          />
          <div
            className="liquid-blob liquid-blob-c about-blob-c"
            style={{
              opacity: 0.85,
              filter: "blur(64px)",
              background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.64), rgba(139,92,246,0.12))",
            }}
          />
          <div className="about-hero-grain" />
        </div>

        <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 relative z-10 text-center">
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-semibold text-primary-800 shadow-sm mb-6">
            Tentang Ramz Florist3
          </span>

          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-900 leading-tight mb-6">
            Merangkai Cerita,
            <br />
            <span className="text-rose-500">Satu Buket Sekaligus</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-primary-900/70 max-w-3xl mx-auto leading-relaxed">
            Kami percaya bunga bukan sekadar hadiah, tetapi cara sederhana untuk menyampaikan rasa sayang, 
            apresiasi, dan perhatian di momen yang berarti.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-screen-2xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="relative">
              <div className={`grid gap-4 ${imagesToShow.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {imagesToShow.map((img: string, idx: number) => (
                  <div key={idx} className={`rounded-3xl overflow-hidden border border-primary-100/70 bg-white shadow-lg relative ${imagesToShow.length === 1 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                    <Image
                      src={img}
                      alt={`Florist Image ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-5 right-5 md:right-8 rounded-2xl bg-white/95 backdrop-blur px-5 py-4 border border-primary-100 shadow-md z-10">
                <p className="font-heading text-2xl font-bold text-primary-900">5+ Tahun</p>
                <p className="text-sm text-primary-900/70">Merangkai bunga dengan sentuhan personal.</p>
              </div>
            </div>

            <div className="space-y-7">
              <div className="space-y-5">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900">
                  Lebih Dari Sekadar Toko Bunga
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Setiap buket kami dirancang untuk mengabadikan momen: dari perayaan bahagia hingga ungkapan perhatian yang tulus.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kami memilih bunga segar setiap hari, banyak di antaranya dari mitra petani lokal, agar rangkaian tetap cantik lebih lama.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-100 flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white text-primary-700 text-xl shrink-0">
                    <span aria-hidden>*</span>
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary-800 mb-1">Buatan Tangan</h3>
                    <p className="text-muted-foreground text-sm">Setiap rangkaian unik dengan perhatian detail.</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-primary-50/80 border border-primary-100 flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white text-primary-700 text-xl shrink-0">
                    <span aria-hidden>~</span>
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary-800 mb-1">Bunga Terpilih</h3>
                    <p className="text-muted-foreground text-sm">Kesegaran warna sebagai prioritas utama.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button asChild className="rounded-full shadow-sm">
                  <Link href="/shop">
                    Lihat Koleksi Bunga Kami
                  </Link>
                </Button>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-primary-900 text-primary-50 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-900 rounded-full blur-3xl opacity-30 -translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 relative z-10 text-center space-y-8">
          <h2 className="font-heading text-3xl md:text-5xl font-bold">Filosofi Ramz</h2>
          <p className="font-body text-xl md:text-2xl text-primary-200 max-w-4xl mx-auto leading-relaxed italic">
            "We build an arrangement that speaks for your unspoken words."
          </p>
          <p className="text-lg text-primary-300 max-w-2xl mx-auto leading-relaxed">
            Tidak ada kata terlambat untuk menunjukkan kepedulian. Kami hadir di sini untuk membantu Anda merangkai pesan manis tersebut melalui sekuntum bunga.
          </p>
        </div>
      </section>

    </main>
  );
}
