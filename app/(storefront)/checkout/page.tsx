'use client'

import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { siteConfig } from '@/site-config'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag } from 'lucide-react'

export default function CheckoutPage() {
  const { items } = useCartStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const onCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some products before checking out.</p>
        <Button onClick={() => router.push('/products')} className="rounded-full px-8 mt-2">
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Review your order</h1>

        <div className="mt-12">
          <ul role="list" className="divide-y border-b border-t">
            {items.map((item) => (
              <li key={item.id} className="flex gap-6 py-6">
                <div className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="font-semibold text-sm whitespace-nowrap">
                      {siteConfig.currency.symbol}{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order summary */}
        <div className="mt-10 rounded-2xl bg-muted/40 border px-6 py-6">
          <h2 className="text-base font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{siteConfig.currency.symbol}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-muted-foreground">Calculated at next step</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span>Total (Est.)</span>
              <span>{siteConfig.currency.symbol}{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            disabled={isLoading}
            className="w-full h-12 rounded-full text-base font-medium mt-6"
            size="lg"
          >
            {isLoading ? 'Loading Checkout...' : 'Proceed to Stripe Checkout'}
          </Button>
        </div>
      </div>
    </div>
  )
}
