import Link from 'next/link';
import { Sparkles, ShoppingBag, User, Menu, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
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
          <Button variant="outline" size="sm" className="hidden md:flex rounded-full border-rose-gold text-rose-gold hover:bg-rose-gold/10">
            Sign In
          </Button>
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
              <DropdownMenuItem className="text-rose-gold font-medium">
                Sign In
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}