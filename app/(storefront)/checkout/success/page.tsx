'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import Link from 'next/link'
import { CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

function SuccessContent() {
  const { clearCart } = useCartStore()
  const searchParams = useSearchParams()
  const isSimulated = searchParams.get('simulated') === 'true'

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="bg-background min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Simulation notice banner */}
      {isSimulated && (
        <div className="w-full max-w-lg mb-8 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
              This was a simulated payment
            </p>
            <p className="text-amber-700 dark:text-amber-400">
              No real money was charged. To enable real Stripe payments, add your{' '}
              <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">STRIPE_SECRET_KEY</code>{' '}
              and{' '}
              <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{' '}
              to <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* Success card */}
      <div className="w-full max-w-lg text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-8">
          <CheckCircle className="h-14 w-14 text-green-500" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          {isSimulated ? 'Order Simulated!' : 'Order Confirmed!'}
        </h1>

        <p className="text-lg text-muted-foreground mb-2">
          {isSimulated
            ? 'The full checkout flow worked end-to-end.'
            : 'Thank you for your purchase!'}
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          {isSimulated
            ? 'Configure your Stripe keys to accept real payments.'
            : 'You will receive an order confirmation email shortly.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="rounded-full px-8" nativeButton={false} render={<Link href="/products" />}>
            Continue Shopping
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8" nativeButton={false} render={<Link href="/account/orders" />}>
            View Orders
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
