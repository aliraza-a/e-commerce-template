import { createClient } from '@/utils/supabase/server'
import { siteConfig } from '@/site-config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Package, ShoppingCart } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch some quick stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
  
  // Calculate total revenue
  const { data: orders } = await supabase.from('orders').select('total')
  const totalRevenue = orders?.reduce((acc, order) => acc + (order.total || 0), 0) || 0

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{siteConfig.currency.symbol}{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCount || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground text-sm">Navigate to the Orders tab to manage and fulfill recent orders.</p>
        </CardContent>
      </Card>
    </div>
  )
}
