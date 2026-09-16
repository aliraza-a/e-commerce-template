'use client'

import { useCartStore } from '@/store/cart'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CartIcon() {
  const { items, toggleCart } = useCartStore()
  // Prevent hydration mismatch by only rendering the count on client
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <button onClick={toggleCart} className="text-gray-600 hover:text-indigo-600 relative transition-colors">
      <ShoppingCart className="h-5 w-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
          {itemCount}
        </span>
      )}
    </button>
  )
}
