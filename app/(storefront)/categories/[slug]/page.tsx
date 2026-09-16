import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { dummyCategories, dummyProducts } from "@/lib/dummy-data";
import { ProductsPageClient } from "@/app/(storefront)/products/ProductsPageClient";

export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const slug = (await params).slug;

  let dbCategory = null;
  let dbProducts = null;

  try {
    // 1. Find category
    const { data: catData } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();
    dbCategory = catData;

    // 2. Find products in that category
    if (dbCategory) {
      const { data: prodData } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("category_id", dbCategory.id)
        .eq("is_active", true);
      dbProducts = prodData;
    }
  } catch (err) {}

  const category = dbCategory || dummyCategories.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  // Fallback for products
  const products = dbProducts && dbProducts.length > 0 
    ? dbProducts 
    : dummyProducts.filter(p => p.category_id === category.id);

  return (
    <ProductsPageClient 
      products={products} 
      title={category.name}
      description={category.description || `Browse our latest ${category.name} collection.`}
    />
  );
}
