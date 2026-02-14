import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const looks = [
    { id: 1, title: 'Crimson Bridal Dream', occasion: 'Bridal', price: '₹45,000', img: 'https://picsum.photos/seed/look1/600/800' },
    { id: 2, title: 'Golden Festive Aura', occasion: 'Diwali', price: '₹12,500', img: 'https://picsum.photos/seed/look2/600/800' },
    { id: 3, title: 'Indigo Office Chic', occasion: 'Office', price: '₹8,200', img: 'https://picsum.photos/seed/look3/600/800' },
    { id: 4, title: 'Pastel Sangeet Bloom', occasion: 'Sangeet', price: '₹22,000', img: 'https://picsum.photos/seed/look4/600/800' },
    { id: 5, title: 'Midnight Velvet Reception', occasion: 'Reception', price: '₹31,000', img: 'https://picsum.photos/seed/look5/600/800' },
    { id: 6, title: 'Emerald Mehndi Bliss', occasion: 'Mehndi', price: '₹15,000', img: 'https://picsum.photos/seed/look6/600/800' },
  ];

  const categories = ['All', 'Bridal', 'Festive', 'Office', 'Sangeet', 'Casual'];

  return (
    <div className="min-h-screen bg-soft-ivory py-20 px-4">
      <div className="container mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b pb-8">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-headline italic">Look Gallery</h1>
            <p className="text-muted-foreground max-w-lg font-light">
              Explore 1,000+ AI-curated complete looks shoppable from top Indian luxury brands.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button key={cat} variant={cat === 'All' ? 'default' : 'outline'} className={`rounded-full px-6 ${cat === 'All' ? 'bg-rose-gold text-white' : 'border-rose-gold/20'}`}>
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {looks.map((look) => (
            <Link key={look.id} href={`/builder?lookId=${look.id}`} className="group">
              <Card className="border-none shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={look.img}
                      alt={look.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/80 backdrop-blur-md text-deep-plum font-bold border-none">
                        {look.occasion}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button variant="ghost" size="icon" className="bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-headline italic leading-tight">{look.title}</h3>
                          <p className="text-xl font-bold font-mono">{look.price}</p>
                        </div>
                        <Button className="rounded-full bg-rose-gold hover:bg-rose-gold/90 border-none scale-0 group-hover:scale-100 transition-transform delay-100">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="bg-deep-plum rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-gold/5 rounded-full translate-x-1/4 translate-y-1/4" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-headline italic text-champagne-gold">Don't see your perfect match?</h2>
            <p className="text-champagne-gold/70 max-w-2xl mx-auto text-lg font-light">
              Use our AI Look Builder to generate a custom head-to-toe look 
              based on your specific budget, style, and body type.
            </p>
            <Button asChild size="lg" className="rounded-full h-16 px-12 text-lg bg-rose-gold text-white border-none shadow-2xl">
              <Link href="/builder">Start Custom Styling</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}