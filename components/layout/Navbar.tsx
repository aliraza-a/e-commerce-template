import Link from "next/link";
import { siteConfig } from "@/site-config";
import { CartIcon } from "@/components/cart/CartIcon";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/(storefront)/login/actions";
import { User, LogOut, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    isAdmin = profile?.role === 'admin';
  }

  return (
    <nav className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              {siteConfig.name}
            </Link>
            <div className="hidden sm:flex sm:space-x-4">
              {siteConfig.mainNav.map((item) => (
                <Button key={item.title} variant="ghost" nativeButton={false} render={<Link href={item.href} />}>
                  {item.title}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <CartIcon />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href="/account" className="cursor-pointer flex items-center" />}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/account/orders" className="cursor-pointer flex items-center" />}>
                    <ShoppingBag className="mr-2 h-4 w-4" /> Orders
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem render={<Link href="/admin" className="cursor-pointer flex items-center text-primary" />}>
                      <ShieldCheck className="mr-2 h-4 w-4" /> Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={
                    <button type="submit" form="logout-form" className="flex items-center w-full text-destructive cursor-pointer" />
                  }>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                  <form id="logout-form" action={logout} className="hidden" />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" nativeButton={false} render={<Link href="/login" />}>
                Sign In
              </Button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
