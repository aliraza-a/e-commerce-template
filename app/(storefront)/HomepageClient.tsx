"use client";

import Link from "next/link";
import { siteConfig } from "@/site-config";
import { ArrowRight, ShoppingBag, Star, Truck, ShieldCheck, RefreshCw, Camera, Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export function HomepageClient({ featuredProducts, categories, newArrivals }: { featuredProducts: any[], categories: any[], newArrivals: any[] }) {
  const trendingNow = featuredProducts.slice(featuredProducts.length > 4 ? 4 : 0, 8);

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/hero3/1920/1080" 
            alt="Hero background" 
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover opacity-40 dark:opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-6">
              NEW COLLECTION 2026
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter"
          >
            Elevate Your <br className="hidden sm:block" /> Everyday Style.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {siteConfig.description} We curate the finest products so you don't have to compromise on quality or style.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all" render={<Link href="/products" className="flex items-center" />}>
              <ShoppingBag className="mr-2 h-5 w-5" /> Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-2" render={<Link href="/about" className="flex items-center" />}>
              Our Story
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Shop by Category</h2>
              <p className="text-muted-foreground text-lg md:text-xl">Find exactly what you're looking for by browsing our curated collections.</p>
            </div>
            <Button variant="link" className="hidden md:inline-flex text-base mt-4 md:mt-0 font-medium" render={<Link href="/categories" className="flex items-center" />}>
              Browse all categories <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {categories.slice(0, 3).map((category) => (
              <motion.div key={category.id} variants={item}>
                <Link href={`/categories/${category.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
                    {category.image_url && (
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-3xl font-bold text-white mb-3">{category.name}</h3>
                      <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center font-medium">
                        Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">New Arrivals</h2>
              <p className="text-muted-foreground text-lg md:text-xl">Be the first to wear our newest designs.</p>
            </div>
            <Button variant="link" className="hidden md:inline-flex text-base mt-4 md:mt-0 font-medium" render={<Link href="/products" className="flex items-center" />}>
              Shop all new arrivals <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
          >
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNER */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/promo/1920/1080" 
            alt="Promotion" 
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Mid-Season Sale</h2>
            <p className="text-xl text-white/90 mb-10">Up to 40% off on selected items. Limited time only. Elevate your wardrobe today.</p>
            <Button size="lg" className="rounded-full px-8 text-base bg-white text-black hover:bg-gray-100" render={<Link href="/products" className="flex items-center" />}>
              Shop Mid-Season Sale
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 5. TRENDING / BEST SELLERS */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Trending Now</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">Our most popular items this week. Grab them before they're gone.</p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
          >
            {trendingNow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
          
          <div className="mt-16 flex justify-center">
             <Button variant="outline" size="lg" className="rounded-full px-8 border-2" render={<Link href="/products" className="flex items-center" />}>
               View All Best Sellers
             </Button>
          </div>
        </div>
      </section>

      {/* 6. WHY SHOP WITH US */}
      <section className="py-24 border-y bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
              <p className="text-muted-foreground">Complimentary standard shipping on all orders over $100.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Returns</h3>
              <p className="text-muted-foreground">30-day return policy for a full refund or exchange.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Checkout</h3>
              <p className="text-muted-foreground">Your payment information is processed securely via Stripe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL / LIFESTYLE BANNER */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Design is in the details</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe that true luxury lies in craftsmanship. Every stitch, every fold, and every texture is meticulously selected to ensure our products stand the test of time. Discover the story behind our latest collection.
              </p>
              <Button size="lg" className="rounded-full px-8" render={<Link href="/about" className="flex items-center" />}>
                Read Our Story
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-muted"
            >
              <Image 
                src="https://picsum.photos/seed/editorial/800/600" 
                alt="Editorial" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-16">Loved by thousands</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "The quality is simply unmatched. I've bought three pieces and they all look stunning and feel premium.", author: "Sarah J." },
              { text: "Fast shipping and incredible packaging. It felt like opening a gift. Will definitely shop here again.", author: "Michael T." },
              { text: "Customer service was brilliant when I needed an exchange. The new size fits perfectly. Highly recommended!", author: "Emma W." }
            ].map((review, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <Quote className="w-10 h-10 text-muted-foreground/20 mb-4" />
                <p className="text-lg font-medium leading-relaxed mb-6">"{review.text}"</p>
                <p className="font-semibold text-muted-foreground">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER SIGNUP */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Join our newsletter</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="h-14 px-6 rounded-full text-base bg-muted/50 border-muted-foreground/20"
              required 
            />
            <Button size="lg" className="h-14 rounded-full px-8 shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* 10. SOCIAL GALLERY */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 mb-12 flex flex-col items-center">
          <Camera className="w-8 h-8 mb-4" />
          <h2 className="text-2xl font-bold tracking-tight">Follow us on Instagram</h2>
          <p className="text-muted-foreground">@storetemplate</p>
        </div>
        <div className="flex flex-nowrap overflow-x-hidden">
          {[1, 2, 3, 4, 5, 6].map((img) => (
            <div key={img} className="relative aspect-square w-1/2 sm:w-1/3 lg:w-1/6 shrink-0 group overflow-hidden border-r last:border-0 border-background">
              <Image 
                src={`https://picsum.photos/seed/social${img}/400/400`} 
                alt="Social post" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  return (
    <motion.div variants={item}>
      <Link href={`/products/${product.slug}`} className="group flex flex-col h-full">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-5">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <Button className="w-full shadow-xl bg-white/95 backdrop-blur-sm text-black hover:bg-white font-medium" size="sm">
              Quick View
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col flex-1 px-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5 font-semibold">
            {product.categories?.name}
          </p>
          <h3 className="font-semibold text-base leading-snug mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="font-medium text-foreground mt-auto">
            {siteConfig.currency.symbol}{product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}