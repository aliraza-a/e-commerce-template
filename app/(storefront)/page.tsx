import { createClient } from "@/utils/supabase/server";
import { dummyCategories, dummyProducts } from "@/lib/dummy-data";
import { HomepageClient } from "./HomepageClient";

export default async function Home() {
  const supabase = await createClient();
  
  let dbFeaturedProducts = null;
  let dbCategories = null;

  try {
    const { data: featured } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .limit(4);
    dbFeaturedProducts = featured;

    const { data: cats } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .limit(3);
    dbCategories = cats;
  } catch (err) {
    // Supabase not configured properly yet, fallback will catch it
  }

  const featuredProducts = dbFeaturedProducts && dbFeaturedProducts.length > 0 
    ? dbFeaturedProducts 
    : dummyProducts.filter(p => p.is_featured).slice(0, 4);

  const categories = dbCategories && dbCategories.length > 0 
    ? dbCategories 
    : dummyCategories.slice(0, 3);

  return <HomepageClient featuredProducts={featuredProducts} categories={categories} newArrivals={dummyProducts} />
}
