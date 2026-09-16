'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { createProduct, updateProduct, deleteProduct } from '@/app/admin/products/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenNew = () => {
    setEditingProduct(null)
    setIsOpen(true)
  }

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product)
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product? This cannot be undone.')) {
      await deleteProduct(id)
      router.refresh()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData)
      } else {
        await createProduct(formData)
      }
      setIsOpen(false)
      router.refresh()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage products, pricing, and inventory.</p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialProducts && initialProducts.length > 0 ? (
              initialProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-muted">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt=""
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Package className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {product.categories?.name || 'Uncategorized'}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.inventory_count}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.is_active ? 'default' : 'secondary'}>
                      {product.is_active ? 'Active' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No products yet. Create your first product!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Make changes to your product here.' : 'Enter the details for the new product.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingProduct?.title} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug (URL-friendly)</Label>
                <Input id="slug" name="slug" defaultValue={editingProduct?.slug} placeholder="e.g. my-awesome-product" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingProduct?.description} rows={3} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" step="0.01" min="0" defaultValue={editingProduct?.price} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="inventory_count">Stock Count</Label>
                  <Input id="inventory_count" name="inventory_count" type="number" min="0" defaultValue={editingProduct?.inventory_count ?? 10} required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image_url">Image URL (Optional)</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="https://picsum.photos/seed/.../800/800"
                  defaultValue={editingProduct?.images?.[0]}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  defaultChecked={editingProduct ? editingProduct.is_active : true}
                  className="h-4 w-4 rounded border accent-primary"
                />
                <Label htmlFor="is_active">Active (visible on store)</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
