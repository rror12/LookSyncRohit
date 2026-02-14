'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Info, AlertCircle, ShoppingBag, Shirt, Heart, Trash2, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function WardrobePage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Red Banarasi Saree', category: 'Outfit', img: 'https://picsum.photos/seed/w1/300/400', color: '#B22222' },
    { id: 2, name: 'Gold Jhumkas', category: 'Jewellery', img: 'https://picsum.photos/seed/w2/300/400', color: '#FFD700' },
    { id: 3, name: 'Embellished Potli', category: 'Bag', img: 'https://picsum.photos/seed/w3/300/400', color: '#DAA520' },
  ]);

  const gaps = [
    { id: 1, text: 'You need a pair of gold-toned Juttis to complete your Festive looks.', urgency: 'High' },
    { id: 2, text: 'A neutral nude heel would add versatility to your Office Saree collection.', urgency: 'Medium' },
    { id: 3, text: 'A heavy choker set is missing to complete your Reception outfits.', urgency: 'Low' },
  ];

  return (
    <div className="min-h-screen bg-soft-ivory py-20 px-4">
      <div className="container mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-headline italic">My Wardrobe</h1>
            <p className="text-muted-foreground max-w-md font-light">
              Manage your existing pieces and let AI identify gaps in your styling arsenal.
            </p>
          </div>
          <Button className="rounded-full h-14 px-8 bg-rose-gold hover:bg-rose-gold/90 text-white">
            <Plus className="mr-2 h-5 w-5" /> Add New Item
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Wardrobe Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline italic">Owned Items</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-full px-4">Outfits (1)</Badge>
                <Badge variant="outline" className="rounded-full px-4">Jewellery (1)</Badge>
                <Badge variant="outline" className="rounded-full px-4">Accessories (1)</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="group overflow-hidden border-none shadow-xl rounded-2xl bg-white">
                  <div className="relative aspect-[3/4]">
                    <Image src={item.img} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="destructive" size="icon" className="rounded-full w-8 h-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-rose-gold">{item.category}</p>
                      <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: item.color }} />
                    </div>
                    <h3 className="font-headline italic text-lg truncate leading-tight">{item.name}</h3>
                  </CardContent>
                </Card>
              ))}
              <button className="aspect-[3/4] border-4 border-dashed border-rose-gold/10 rounded-2xl flex flex-col items-center justify-center text-rose-gold/40 hover:bg-rose-gold/5 transition-all space-y-4">
                <Plus className="h-10 w-10" />
                <span className="font-bold uppercase tracking-widest text-xs">Upload Photo</span>
              </button>
            </div>
          </div>

          {/* AI Gap Analysis */}
          <div className="space-y-8">
            <Card className="border-none shadow-2xl rounded-[2rem] bg-deep-plum text-champagne-gold p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="h-24 w-24" />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-headline italic">AI Gap Analysis</h2>
                  <p className="text-sm opacity-60 font-light">Based on your saved looks and owned items.</p>
                </div>

                <div className="space-y-6">
                  {gaps.map((gap) => (
                    <div key={gap.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex gap-4 hover:bg-white/10 transition-colors">
                      <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        gap.urgency === 'High' ? 'bg-rose-gold' : 'bg-muted opacity-50'
                      }`}>
                        <AlertCircle className="h-3 w-3 text-white" />
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm leading-relaxed">{gap.text}</p>
                        <Button variant="link" className="p-0 h-auto text-rose-gold font-bold uppercase text-[10px] tracking-widest">
                          Shop Similar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold opacity-60">
                    <span>Wardrobe Completeness</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-white/10" />
                  <p className="text-[10px] opacity-40 italic">Add 5 more items to unlock "Virtual Stylist" premium tier.</p>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-xl rounded-[2rem] bg-rose-gold p-8 text-white text-center space-y-4">
              <ShoppingBag className="h-12 w-12 mx-auto opacity-80" />
              <h3 className="text-2xl font-headline italic">Complete Your Story</h3>
              <p className="text-sm opacity-90 font-light">
                Shop our curated recommendations to turn your "almost" looks into "perfect" moments.
              </p>
              <Button className="w-full rounded-full bg-white text-rose-gold hover:bg-white/90">
                Shop Recommendations
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
