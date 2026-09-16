export const siteConfig = {
  name: "StoreTemplate",
  description: "A beautiful, modern e-commerce template built with Next.js and Supabase.",
  contactEmail: "support@storetemplate.com",
  currency: {
    code: "USD",
    symbol: "$",
  },
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/products" },
    { title: "Categories", href: "/categories" },
    { title: "About", href: "/about" },
  ],
  footerLinks: [
    { title: "Terms of Service", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Return Policy", href: "/returns" },
  ],
  socials: {
    twitter: "https://twitter.com/yourstore",
    instagram: "https://instagram.com/yourstore",
    facebook: "https://facebook.com/yourstore",
  },
}

export type SiteConfig = typeof siteConfig
