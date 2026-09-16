'use client'

import Link from "next/link";
import { siteConfig } from "@/site-config";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ProductsPageClient({ 
  products,
  title = "The Collection",
  description = "Explore our complete catalog of carefully curated pieces designed to elevate your everyday."
}: { 
  products: any[],
  title?: string,
  description?: string
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filters bar placeholder */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b pb-4 gap-4">
          <div className="text-sm font-medium text-muted-foreground">
            Showing {products.length} products
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="rounded-full">Sort by: Featured</Button>
             <Button variant="outline" size="sm" className="rounded-full">Filter</Button>
          </div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Link href={`/products/${product.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-4">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <Button className="w-full shadow-lg bg-white/90 backdrop-blur-sm text-black hover:bg-white font-medium" size="sm">
                      Quick View
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 px-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-semibold">
                    {product.categories?.name || 'Accessories'}
                  </p>
                  <h3 className="font-medium text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="font-medium mt-auto">
                    {siteConfig.currency.symbol}{product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {products.length === 0 && (
          <div className="text-center py-32">
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}
