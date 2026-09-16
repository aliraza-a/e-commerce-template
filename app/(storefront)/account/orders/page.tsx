import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Package, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" render={<Link href="/account" />}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">My Orders</h1>
        </div>

        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">Order #{order.id.slice(0, 8)}</CardTitle>
                    <CardDescription>{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${order.total?.toFixed(2)}</span>
                    <Badge variant={order.status === 'completed' ? 'default' : order.status === 'processing' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold">No orders yet</h2>
              <p className="text-muted-foreground text-center max-w-xs">
                When you place your first order, it will appear here.
              </p>
              <Button className="rounded-full mt-2" render={<Link href="/products" />}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
