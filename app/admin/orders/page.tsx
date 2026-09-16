import { createClient } from '@/utils/supabase/server'
import { siteConfig } from '@/site-config'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })

  const statusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    if (status === 'completed') return 'default'
    if (status === 'processing') return 'secondary'
    if (status === 'cancelled') return 'destructive'
    return 'outline'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-2">Manage and fulfill customer orders.</p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Shipping Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary font-mono text-xs">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{order.profiles?.full_name || 'Guest'}</div>
                    <div className="text-sm text-muted-foreground">{order.profiles?.email || 'N/A'}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {siteConfig.currency.symbol}{order.total?.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {order.shipping_address
                      ? `${order.shipping_address.line1}, ${order.shipping_address.city}`
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No orders have been placed yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
