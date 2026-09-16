'use client'

import { useCartStore } from '@/store/cart'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/site-config'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function CartDrawer() {
  const { items, isOpen, removeItem, updateQuantity, toggleCart } = useCartStore()
  const router = useRouter()

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = () => {
    toggleCart()
    router.push('/checkout')
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-md bg-background/95 backdrop-blur-xl p-0 border-l shadow-2xl">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center text-lg font-semibold tracking-tight">
            <ShoppingBag className="mr-2 h-5 w-5" /> Your Cart 
            <span className="ml-2 text-muted-foreground font-normal text-sm">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-5 p-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-50" />
            </div>
            <p className="text-lg font-medium text-foreground">Your cart is empty</p>
            <p className="text-center text-muted-foreground text-sm max-w-[200px]">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button size="lg" className="rounded-full mt-4" onClick={toggleCart}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <ul className="px-6 py-6 space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 group">
                    <div className="relative h-24 w-20 sm:w-24 shrink-0 rounded-lg overflow-hidden bg-muted border">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-medium text-sm leading-tight line-clamp-2 pr-4 text-foreground">{item.title}</h3>
                          <p className="font-semibold text-sm whitespace-nowrap">
                            {siteConfig.currency.symbol}{item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Qty {item.quantity}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-muted/50 rounded-full border border-border/50">
                          <button
                            type="button"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-l-full hover:bg-muted"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-r-full hover:bg-muted"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            
            <div className="p-6 bg-muted/20 border-t backdrop-blur-sm">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">{siteConfig.currency.symbol}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{siteConfig.currency.symbol}{subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full h-12 rounded-full text-base font-medium shadow-lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
