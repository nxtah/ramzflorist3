import { prisma } from './prisma';

export async function readBouquets() {
  try {
    const bouquets = await prisma.bouquet.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return bouquets;
  } catch (err) {
    console.error("Error reading bouquets from database", err);
    return [];
  }
}

export async function writeBouquets(data: any[]) {
  // We no longer overwrite the whole array as we are in a relational database.
  // The app/api/bouquets routes should be updated to use prisma directly.
  // This is left here just in case, but shouldn't be used directly like fs.writeFile
}

export async function getNextId() {
  // Database handles IDs automatically (autoincrement)
  return 0;
}

export async function readCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return categories.map(c => c.name);
  } catch (err) {
    return [];
  }
}

export async function writeCategories(data: string[]) {
  // Will be handled natively in the API by Prisma instead
}

export async function readSiteConfig() {
  try {
    let config = await prisma.siteConfig.findUnique({
      where: { id: 1 }
    });
    if (!config) {
      config = await prisma.siteConfig.create({
        data: { id: 1 }
      });
    }
    return {
      siteName: config.siteName,
      siteDescription: config.siteDescription,
      contact: {}, // legacy compat
      hero: {
        title: "Welcome to Ramz Florist",
        subtitle: "Beautiful flowers for every occasion."
      },
      banner: {
        text: config.bannerText,
        isActive: config.bannerActive
      },
      about: {
        images: config.aboutImages
      },
      features: [] // legacy compat
    };
  } catch (err) {
    return DEFAULT_CONFIG;
  }
}

export async function writeSiteConfig(data: any) {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      siteName: data.siteName || "Ramz Florist",
      siteDescription: data.siteDescription || "Elegant Florist",
      bannerText: data.banner?.text || "Welcome",
      bannerActive: data.banner?.isActive || false,
      aboutImages: data.about?.images || [],
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
}

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
