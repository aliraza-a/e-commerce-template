import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/(storefront)/login/actions'
import Link from 'next/link'
import { Package, User, LogOut, ShieldCheck, MapPin, Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching profile:', error)
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="min-h-screen bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <User className="h-10 w-10" />
                  </div>
                  <h2 className="text-xl font-bold">{profile?.full_name || 'Customer'}</h2>
                  <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
                  
                  {isAdmin ? (
                    <Badge variant="default" className="mb-6"><ShieldCheck className="w-3 h-3 mr-1" /> Admin</Badge>
                  ) : (
                    <Badge variant="secondary" className="mb-6">Customer</Badge>
                  )}
                  
                  <form action={logout} className="w-full">
                    <Button variant="outline" className="w-full" type="submit">
                      <LogOut className="h-4 w-4 mr-2" /> Sign out
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Manage your store activities from here.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Link href="/account/orders" className="group">
                  <div className="p-4 rounded-xl border bg-card transition-colors hover:border-primary">
                    <Package className="h-8 w-8 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                    <h3 className="font-semibold mb-1">Orders</h3>
                    <p className="text-sm text-muted-foreground">Track or return your past purchases</p>
                  </div>
                </Link>

                <Link href="/account/wishlist" className="group">
                  <div className="p-4 rounded-xl border bg-card transition-colors hover:border-primary">
                    <Heart className="h-8 w-8 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                    <h3 className="font-semibold mb-1">Wishlist</h3>
                    <p className="text-sm text-muted-foreground">View your saved favorite items</p>
                  </div>
                </Link>

                <Link href="/account/addresses" className="group">
                  <div className="p-4 rounded-xl border bg-card transition-colors hover:border-primary">
                    <MapPin className="h-8 w-8 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                    <h3 className="font-semibold mb-1">Addresses</h3>
                    <p className="text-sm text-muted-foreground">Manage your shipping addresses</p>
                  </div>
                </Link>

                {isAdmin && (
                  <Link href="/admin" className="group">
                    <div className="p-4 rounded-xl border bg-primary/5 hover:bg-primary/10 transition-colors">
                      <ShieldCheck className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-semibold mb-1 text-primary">Admin Panel</h3>
                      <p className="text-sm text-muted-foreground">Access store management tools</p>
                    </div>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
