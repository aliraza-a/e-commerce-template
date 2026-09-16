import { createClient } from "@/utils/supabase/server";
import { dummyProducts } from "@/lib/dummy-data";
import { ProductsPageClient } from "./ProductsPageClient";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();
  
  const resolvedParams = await searchParams;
  const categoryFilter = resolvedParams.category as string;

  let dbProducts = null;
  try {
    let query = supabase.from("products").select("*, categories(name)").eq("is_active", true);
    // Real app would filter by category here if categoryFilter is present
    const { data } = await query;
    dbProducts = data;
  } catch(err) {
    // Ignore error and fallback to dummy
  }
  
  const products = dbProducts && dbProducts.length > 0 ? dbProducts : dummyProducts;

  return <ProductsPageClient products={products} />
}
