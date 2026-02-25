import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const bouquetsPath = path.join(dataDir, 'bouquets.json');
const categoriesPath = path.join(dataDir, 'categories.json');
const siteConfigPath = path.join(dataDir, 'site-config.json');

export async function readBouquets() {
  try {
    const data = await fs.readFile(bouquetsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

export async function writeBouquets(data: any[]) {
  await fs.writeFile(bouquetsPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getNextId() {
  const bouquets = await readBouquets();
  if (!bouquets.length) return 1;
  return Math.max(...bouquets.map((b: any) => b.id)) + 1;
}

export async function readCategories() {
  try {
    const data = await fs.readFile(categoriesPath, 'utf-8');
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

export async function readSiteConfig() {
  try {
    const data = await fs.readFile(siteConfigPath, 'utf-8');
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === 'ENOENT') return DEFAULT_CONFIG;
    throw err;
  }
}

const DEFAULT_CONFIG = {
  siteName: "Ramz Florist",
  siteDescription: "Elegant Florist & Bouquet Shop",
  contact: {},
  hero: {
    title: "Welcome to Ramz Florist",
    subtitle: "Beautiful flowers for every occasion."
  },
  features: []
};
