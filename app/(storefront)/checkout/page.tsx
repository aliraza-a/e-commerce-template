'use client'

import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { siteConfig } from '@/site-config'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, AlertTriangle, CreditCard, Truck, Lock } from 'lucide-react'

// Detect placeholder Stripe key on the client via the public env var
const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
const isStripeConfigured =
  STRIPE_PK.length > 20 &&
  !STRIPE_PK.startsWith('pk_test_...') &&
  STRIPE_PK !== 'pk_test_...' &&
  STRIPE_PK.startsWith('pk_')

export default function CheckoutPage() {
  const { items } = useCartStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal >= 100 ? 0 : 10
  const total = subtotal + shipping

  const onCheckout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        throw new Error('Checkout failed. Please try again.')
      }

      const data = await response.json()

      if (data.simulated) {
        // Stripe not configured — redirect to success page in simulation mode
        router.push('/checkout/success?simulated=true')
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
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
    <div className="bg-background min-h-screen">
      {/* Simulation Banner — only shown when Stripe is not configured */}
      {!isStripeConfigured && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 px-4 py-3">
          <div className="container mx-auto max-w-3xl flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold text-amber-800 dark:text-amber-300">
                Simulated Checkout Mode —{' '}
              </span>
              <span className="text-amber-700 dark:text-amber-400">
                Stripe is not configured. Payments will be simulated for demo purposes.
                Add your{' '}
                <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">
                  STRIPE_SECRET_KEY
                </code>{' '}
                and{' '}
                <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">
                  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                </code>{' '}
                to <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">.env.local</code> to enable real payments.
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Review your order</h1>
        <p className="text-muted-foreground mb-10 text-sm">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>

        {/* Order items */}
        <ul role="list" className="divide-y border rounded-2xl overflow-hidden mb-8">
          {items.map((item) => (
            <li key={item.id} className="flex gap-5 p-5 bg-card">
              <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-muted">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    No Img
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex justify-between gap-4">
                  <h4 className="font-medium text-sm leading-tight">{item.title}</h4>
                  <p className="font-semibold text-sm whitespace-nowrap">
                    {siteConfig.currency.symbol}{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {siteConfig.currency.symbol}{item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Order summary + CTA */}
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-base font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{siteConfig.currency.symbol}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">
                {shipping === 0
                  ? <span className="text-green-600 dark:text-green-400">Free</span>
                  : `${siteConfig.currency.symbol}${shipping.toFixed(2)}`}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{siteConfig.currency.symbol}{total.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3 border border-destructive/20">
              {error}
            </div>
          )}

          <Button
            onClick={onCheckout}
            disabled={isLoading}
            className="w-full h-12 rounded-full text-base font-semibold mt-6 gap-2"
            size="lg"
          >
            {isLoading ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                {isStripeConfigured ? 'Redirecting to Stripe…' : 'Simulating payment…'}
              </>
            ) : (
              <>
                {isStripeConfigured ? (
                  <><CreditCard className="h-4 w-4" /> Pay with Stripe</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Simulate Payment</>
                )}
              </>
            )}
          </Button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Secure checkout</span>
            <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Free over {siteConfig.currency.symbol}100</span>
          </div>
        </div>
      </div>
    </div>
  )
}
