import { readSiteConfig } from "@/lib/json-db";

export default async function BannerPromo() {
  const config = await readSiteConfig();
  const banner = config.banner;

  if (!banner || !banner.isActive) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 overflow-hidden relative z-50">
      {/* Running text container */}
      <div className="whitespace-nowrap flex inline-block animate-marquee font-body text-sm font-medium tracking-wide">
        <span className="mx-4">{banner.text}</span>
        <span className="mx-4">{banner.text}</span>
        <span className="mx-4">{banner.text}</span>
        <span className="mx-4">{banner.text}</span>
      </div>
    </div>
  );
}
