import { readBouquets, readCategories } from '@/lib/json-db';
import LandingPage from '@/components/landing-page';

// Force dynamic rendering if consistent updates are needed, or use revalidation
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Parallel data fetching
  const [bouquets, categories] = await Promise.all([
    readBouquets(),
    readCategories()
  ]);

  // Filter for featured bouquets if available, otherwise just take the first few
  const featured = bouquets.filter((b: any) => b.isFeatured);
  const displayBouquets = featured.length >= 8 ? featured : bouquets.slice(0, 8);

  return (
    <main>
      <LandingPage
        categories={categories}
        featuredBouquets={displayBouquets}
      />
    </main>
  );
}

