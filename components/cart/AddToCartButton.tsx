'use client'

import { useCartStore } from '@/store/cart'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'

type AddToCartButtonProps = {
  product: {
    id: string
    title: string
    price: number
    images?: string[]
    inventory_count: number
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)

  const isOutOfStock = product.inventory_count <= 0

  const handleAdd = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0],
        quantity: 1,
      })
      setIsLoading(false)
    }, 200)
  }

  return (
    <Button
      size="lg"
      onClick={handleAdd}
      disabled={isOutOfStock || isLoading}
      className="w-full sm:w-auto px-12 h-14 rounded-full text-base"
    >
      <ShoppingBag className="mr-2 h-5 w-5" />
      {isLoading ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
    </Button>
  )
}
