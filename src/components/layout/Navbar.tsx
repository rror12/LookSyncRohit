'use client';

import Link from 'next/link';
import { Sparkles, ShoppingBag, User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-headline font-bold text-rose-gold italic">LookSync</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/builder" className="hover:text-rose-gold transition-colors">Look Builder</Link>
          <Link href="/palette-matcher" className="hover:text-rose-gold transition-colors">Palette Matcher</Link>
          <Link href="/gallery" className="hover:text-rose-gold transition-colors">Explore</Link>
          <Link href="/wardrobe" className="hover:text-rose-gold transition-colors">Wardrobe</Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Sparkles className="h-5 w-5 text-rose-gold" />
          </Button>

          {isUserLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5 text-deep-plum" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuItem className="font-medium text-xs text-muted-foreground uppercase tracking-widest px-4 py-2">
                  {user.isAnonymous ? 'Guest User' : user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/wardrobe">My Wardrobe</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gallery">Saved Looks</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive font-medium" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm" className="hidden md:flex rounded-full border-rose-gold text-rose-gold hover:bg-rose-gold/10">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/builder">Look Builder</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/palette-matcher">Palette Matcher</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/gallery">Explore Looks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/wardrobe">My Wardrobe</Link>
              </DropdownMenuItem>
              {!user && (
                <DropdownMenuItem asChild className="text-rose-gold font-medium">
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
