import { createClient } from "@/utils/supabase/server";
import { dummyCategories } from "@/lib/dummy-data";
import { CategoriesPageClient } from "./CategoriesPageClient";

export default async function CategoriesPage() {
  const supabase = await createClient();
  
  let categories = [];
  try {
    const { data } = await supabase.from("categories").select("*").order("name");
    categories = data || [];
  } catch (err) {
    // Ignore error
  }

  const finalCategories = categories.length > 0 ? categories : dummyCategories;

  return <CategoriesPageClient categories={finalCategories} />
}
