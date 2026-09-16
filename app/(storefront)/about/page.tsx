'use client'

import { siteConfig } from "@/site-config";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {siteConfig.description} We started with a simple idea: to provide high-quality, beautifully designed products without the traditional markup.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-muted"
          >
            <Image
              src="https://picsum.photos/seed/about/800/1000"
              alt="Our workspace"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Craftsmanship first</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Every piece in our collection is meticulously crafted by skilled artisans using premium materials. We believe in sustainable practices and ethical production.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">Direct to you</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                By cutting out the middlemen, we're able to offer exceptional value. You get the quality you expect from high-end boutiques, delivered straight to your door.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
