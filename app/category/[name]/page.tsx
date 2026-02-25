import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl mb-8 text-primary">Category: Anniversary</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* <ProductCard /> xN */}
        <Card className="rounded-2xl shadow-lg p-4 flex flex-col items-center">
          <div className="w-full h-48 bg-secondary rounded-xl mb-4" />
          <h3 className="font-heading text-lg mb-2 text-charcoal">Bouquet Name</h3>
          <Badge className="mb-2 bg-primary/20 text-primary">Anniversary</Badge>
          <span className="font-body text-accent font-semibold mb-2">Rp 350.000</span>
          <Button className="mt-auto w-full rounded-2xl bg-primary text-white font-body text-base shadow transition-all hover:bg-accent">Add to Cart</Button>
        </Card>
      </div>
    </main>
  );
}
