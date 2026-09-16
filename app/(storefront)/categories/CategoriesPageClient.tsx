'use client'

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { dummyCategories } from "@/lib/dummy-data";
import { motion } from "framer-motion";

export function CategoriesPageClient({ categories }: { categories: any[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Categories</h1>
          <p className="text-lg text-muted-foreground">Discover pieces tailored to your exact needs across our curated collections.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link href={`/categories/${category.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                    <div className="w-12 h-1 bg-white/50 rounded-full group-hover:w-24 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
