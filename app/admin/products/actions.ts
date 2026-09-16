'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  // Authenticate admin (redundant but secure)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const inventory_count = parseInt(formData.get('inventory_count') as string)
  const is_active = formData.get('is_active') === 'on'

  // Image handling is a bit complex for a simple demo, so let's just use a dummy pic if none provided
  const image_url = formData.get('image_url') as string
  const images = image_url ? [image_url] : [`https://picsum.photos/seed/${slug}/800/800`]

  const { error } = await supabase.from('products').insert({
    title,
    slug,
    description,
    price,
    inventory_count,
    is_active,
    images
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/products')
  return { success: true }
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const inventory_count = parseInt(formData.get('inventory_count') as string)
  const is_active = formData.get('is_active') === 'on'
  const image_url = formData.get('image_url') as string

  const updateData: any = {
    title,
    slug,
    description,
    price,
    inventory_count,
    is_active
  }

  if (image_url) {
    updateData.images = [image_url]
  }

  const { error } = await supabase.from('products').update(updateData).eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/products')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
  return { success: true }
}
