import Link from "next/link";
import { siteConfig } from "@/site-config";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-12 mb-20">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              {siteConfig.name}
            </Link>
            <p className="mt-6 text-muted-foreground text-sm max-w-[280px] leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {siteConfig.footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
