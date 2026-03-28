import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

const DEFAULT_CONFIG = {
  siteName: "Ramz Florist",
  siteDescription: "Elegant Florist & Bouquet Shop",
  contact: {},
  hero: {
    title: "Welcome to Ramz Florist",
    subtitle: "Beautiful flowers for every occasion."
  },
  banner: {
    text: "Welcome to Ramz Florist! Enjoy our latest collections.",
    isActive: false
  },
  about: {
    images: []
  },
  features: []
};

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let config = await prisma.siteConfig.findUnique({
      where: { id: 1 }
    });

    if (!config) {
      config = await prisma.siteConfig.create({
        data: { id: 1 }
      });
    }

    return NextResponse.json({
      siteName: config.siteName,
      siteDescription: config.siteDescription,
      contact: {}, // legacy dop
      hero: DEFAULT_CONFIG.hero,
      banner: {
        text: config.bannerText,
        isActive: config.bannerActive
      },
      about: {
        images: config.aboutImages
      },
      features: []
    });
  } catch (error) {
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = verifyAuth(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    const updated = await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        bannerText: data.banner?.text,
        bannerActive: data.banner?.isActive,
        aboutImages: data.about?.images,
      },
      create: {
        id: 1,
        siteName: data.siteName || "Ramz Florist",
        siteDescription: data.siteDescription || "Elegant Florist",
        bannerText: data.banner?.text || "Welcome",
        bannerActive: data.banner?.isActive || false,
        aboutImages: data.about?.images || [],
      }
    });

    return NextResponse.json({
        siteName: updated.siteName,
        siteDescription: updated.siteDescription,
        contact: {},
        hero: DEFAULT_CONFIG.hero,
        banner: {
          text: updated.bannerText,
          isActive: updated.bannerActive
        },
        about: {
          images: updated.aboutImages
        },
        features: []
    }, { status: 200 });
  } catch (error) {
    console.error("Failed to update config", error);
    return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
  }
}
