'use client'

import { siteConfig } from "@/site-config";
import Image from "next/image";
import { motion } from "framer-motion";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ProductDetailsClient({ product }: { product: any }) {
  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* Image gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col-reverse lg:sticky lg:top-24 h-fit"
          >
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-muted relative">
              {product.images?.[0] ? (
                 <Image
                 src={product.images[0]}
                 alt={product.title}
                 fill
                 sizes="(max-width: 1024px) 100vw, 50vw"
                 className="object-cover object-center"
                 priority
               />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  No Image Available
                </div>
              )}
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0"
          >
            <div className="flex items-center gap-3 mb-4">
               <Badge variant="secondary" className="uppercase tracking-widest text-xs font-semibold px-3 py-1">
                 {product.categories?.name || 'Category'}
               </Badge>
               {product.inventory_count < 5 && product.inventory_count > 0 && (
                 <Badge variant="destructive" className="uppercase tracking-widest text-xs font-semibold px-3 py-1">
                   Low Stock
                 </Badge>
               )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              {product.title}
            </h1>
            
            <div className="mt-4 flex items-center">
              <p className="text-3xl font-medium text-foreground">
                {siteConfig.currency.symbol}{product.price.toFixed(2)}
              </p>
            </div>

            <Separator className="my-8" />

            <div className="prose prose-sm sm:prose-base dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
            </div>

            <div className="mt-10 mb-8">
              <AddToCartButton product={product} />
            </div>
            
            {/* Inventory Status */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-center">
              {product.inventory_count > 0 ? (
                <p className="text-sm font-medium flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-3 animate-pulse"></span>
                  In stock and ready to ship ({product.inventory_count} available)
                </p>
              ) : (
                <p className="text-sm font-medium flex items-center text-destructive">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive mr-3"></span>
                  Currently out of stock
                </p>
              )}
            </div>
            
            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <div className="flex">
                <span className="font-semibold text-foreground w-32">Shipping</span>
                <span>Free standard shipping on all orders.</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-foreground w-32">Returns</span>
                <span>Return within 30 days of purchase.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
