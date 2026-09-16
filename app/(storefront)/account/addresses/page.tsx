import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function AddressesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" render={<Link href="/account" />}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">Saved Addresses</h1>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No addresses saved</h2>
            <p className="text-muted-foreground text-center max-w-xs">
              Your shipping addresses will be saved automatically when you place an order.
            </p>
            <Button className="rounded-full mt-2" render={<Link href="/products" />}>
              Shop Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
