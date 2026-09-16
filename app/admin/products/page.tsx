import { createClient } from '@/utils/supabase/server'
import { ProductsClient } from '@/components/admin/ProductsClient'

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return <ProductsClient initialProducts={products || []} />
}
