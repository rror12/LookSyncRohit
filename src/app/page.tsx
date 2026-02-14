import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroLook = PlaceHolderImages.find(img => img.id === 'hero-look');
  
  const occasions = [
    { id: 'bridal', name: 'Bridal', img: 'occasion-bridal', desc: 'Regal elegance for your big day.' },
    { id: 'festive', name: 'Festive', img: 'occasion-festive', desc: 'Vibrant looks for Diwali & Eid.' },
    { id: 'office', name: 'Office', img: 'occasion-office', desc: 'Power dressing with a classic touch.' },
    { id: 'casual', name: 'Casual', img: 'occasion-casual', desc: 'Effortless chic for your weekend.' },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroLook?.imageUrl || ''}
            alt="Hero Look"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-plum/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-gold/20 border border-rose-gold/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-rose-gold" />
              <span className="text-xs font-bold uppercase tracking-wider">AI-Powered Styling</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline italic leading-tight">
              Your Perfect Look. <br />Every Occasion.
            </h1>
            <p className="text-xl opacity-90 font-light max-w-lg">
              One click to a complete, head-to-toe curated look including matching jewellery, 
              footwear, and the perfect makeup palette.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg bg-rose-gold hover:bg-rose-gold/90 border-none">
                <Link href="/builder">Build My Look</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg bg-white/10 hover:bg-white/20 text-white border-white/50 backdrop-blur-sm">
                <Link href="/gallery">Explore Trends</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <span className="text-sm font-bold tracking-widest uppercase">10,000+ Looks Created</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-sm font-bold tracking-widest uppercase">500+ Luxury Brands</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span className="text-sm font-bold tracking-widest uppercase">98% Match Accuracy</span>
          </div>
        </div>
      </section>

      {/* Occasion Grid */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline italic">Shop by Occasion</h2>
          <p className="text-muted-foreground">Expertly curated collections for the moments that matter most.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {occasions.map((occ) => {
            const occImg = PlaceHolderImages.find(img => img.id === occ.img);
            return (
              <Link key={occ.id} href={`/builder?step=2&occasion=${occ.id}`} className="group">
                <Card className="overflow-hidden border-none shadow-xl transition-transform hover:-translate-y-2 duration-300">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={occImg?.imageUrl || ''}
                      alt={occ.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-headline mb-1 italic">{occ.name}</h3>
                      <p className="text-sm opacity-80 line-clamp-2">{occ.desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured CTA Section */}
      <section className="bg-deep-plum py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-champagne-gold/5 skew-x-12 transform translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-champagne-gold">
              <h2 className="text-5xl md:text-6xl font-headline italic leading-tight">
                Got an outfit? <br />Find its soulmate.
              </h2>
              <p className="text-lg opacity-80 font-light max-w-md">
                Upload a photo of your existing dress and our AI will suggest the perfect matching
                lipstick, heels, and jewellery to complete the story.
              </p>
              <Button asChild size="lg" className="rounded-full bg-rose-gold hover:bg-rose-gold/90 text-white">
                <Link href="/palette-matcher" className="flex items-center space-x-2">
                  <span>Try Palette Matcher</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src="https://picsum.photos/seed/palette-demo/800/600"
                alt="Palette Matcher Demo"
                fill
                className="object-cover"
                data-ai-hint="indian jewelry makeup"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
