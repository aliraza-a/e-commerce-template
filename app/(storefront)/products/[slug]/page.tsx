import { siteConfig } from "@/site-config";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { dummyProducts } from "@/lib/dummy-data";
import { ProductDetailsClient } from "./ProductDetailsClient";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const slug = (await params).slug;

  // Let's wrap supabase in a try/catch in case the URL is invalid (e.g. still "your-supabase-url")
  let dbProduct = null;
  try {
    const { data } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("slug", slug)
      .single();
    dbProduct = data;
  } catch (err) {
    // Ignore error and fallback to dummy data
  }

  const product = dbProduct || dummyProducts.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />
}
