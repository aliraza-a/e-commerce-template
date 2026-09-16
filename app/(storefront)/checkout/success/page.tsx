'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-8" />
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Order placed successfully!
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          Thank you for your purchase. You will receive an order confirmation email shortly.
        </p>
        <Button size="lg" className="rounded-full px-8" render={<Link href="/products" />}>
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}
