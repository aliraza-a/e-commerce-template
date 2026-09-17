import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function WishlistPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/account" />}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">Wishlist</h1>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
            <p className="text-muted-foreground text-center max-w-xs">
              Save items you love to your wishlist and they'll appear here.
            </p>
            <Button className="rounded-full mt-2" nativeButton={false} render={<Link href="/products" />}>
              Explore Products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
