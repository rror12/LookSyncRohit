'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sparkles, ChevronRight, ChevronLeft, CheckCircle2, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { generateCompleteOutfitLook, type GenerateCompleteOutfitLookOutput, type GenerateCompleteOutfitLookInput } from '@/ai/flows/generate-complete-outfit-look';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type Step = 1 | 2 | 3;

export default function LookBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialOccasion = searchParams.get('occasion') as any || 'Festive';
  
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GenerateCompleteOutfitLookInput>({
    occasion: initialOccasion,
    budgetMin: 5000,
    budgetMax: 25000,
    skinTone: 'Fair',
    bodyType: 'Hourglass',
    stylePreference: 'Traditional',
    colorPreference: 'Surprise me',
  });
  const [result, setResult] = useState<GenerateCompleteOutfitLookOutput | null>(null);

  const skinTones = [
    { name: 'Fair', color: '#f5d6c6' },
    { name: 'Wheatish', color: '#e6b99e' },
    { name: 'Medium', color: '#d19c7a' },
    { name: 'Dusky', color: '#8d5524' },
    { name: 'Deep', color: '#3c201d' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setStep(3);
    try {
      const output = await generateCompleteOutfitLook(formData);
      setResult(output);
    } catch (error) {
      console.error('Failed to generate look:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-headline italic">Choose Your Occasion</h1>
        <p className="text-muted-foreground">Tell us where you're headed, and we'll handle the rest.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['Bridal', 'Mehndi', 'Sangeet', 'Reception', 'Eid', 'Diwali', 'Office', 'Casual', 'Date Night', 'Festive'].map((occ) => (
          <Button
            key={occ}
            variant={formData.occasion === occ ? 'default' : 'outline'}
            className={`h-24 flex flex-col items-center justify-center space-y-2 rounded-xl border-2 transition-all ${
              formData.occasion === occ ? 'border-rose-gold bg-rose-gold text-white' : 'hover:border-rose-gold/50'
            }`}
            onClick={() => setFormData({ ...formData, occasion: occ as any })}
          >
            <span className="font-semibold">{occ}</span>
          </Button>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Button size="lg" onClick={() => setStep(2)} className="rounded-full bg-deep-plum text-champagne-gold px-12 h-14">
          Next Step <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-headline italic">Style Preferences</h1>
        <p className="text-muted-foreground">Personalize your look for the perfect fit.</p>
      </div>

      <div className="grid gap-12">
        {/* Budget */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-bold uppercase tracking-widest text-deep-plum">Budget Range</Label>
            <span className="text-rose-gold font-bold font-mono">₹{formData.budgetMin} - ₹{formData.budgetMax}</span>
          </div>
          <Slider
            defaultValue={[formData.budgetMin, formData.budgetMax]}
            max={100000}
            step={1000}
            onValueChange={([min, max]) => setFormData({ ...formData, budgetMin: min, budgetMax: max })}
            className="py-4"
          />
        </div>

        {/* Skin Tone */}
        <div className="space-y-6">
          <Label className="text-lg font-bold uppercase tracking-widest text-deep-plum">Skin Tone</Label>
          <RadioGroup 
            defaultValue={formData.skinTone} 
            className="flex flex-wrap gap-4"
            onValueChange={(val) => setFormData({ ...formData, skinTone: val as any })}
          >
            {skinTones.map((tone) => (
              <div key={tone.name} className="flex flex-col items-center space-y-2">
                <RadioGroupItem value={tone.name} id={tone.name} className="sr-only" />
                <Label
                  htmlFor={tone.name}
                  className={`w-14 h-14 rounded-full cursor-pointer ring-offset-2 transition-all ${
                    formData.skinTone === tone.name ? 'ring-2 ring-rose-gold scale-110' : 'opacity-80'
                  }`}
                  style={{ backgroundColor: tone.color }}
                />
                <span className="text-xs font-medium">{tone.name}</span>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Style Pref */}
        <div className="space-y-6">
          <Label className="text-lg font-bold uppercase tracking-widest text-deep-plum">Style Preference</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['Traditional', 'Indo-Western', 'Western', 'Minimalist', 'Maximalist'].map((style) => (
              <Button
                key={style}
                variant={formData.stylePreference === style ? 'default' : 'outline'}
                className={`rounded-full ${formData.stylePreference === style ? 'bg-rose-gold text-white' : ''}`}
                onClick={() => setFormData({ ...formData, stylePreference: style as any })}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        {/* Body Type */}
        <div className="space-y-6">
          <Label className="text-lg font-bold uppercase tracking-widest text-deep-plum">Body Type</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['Apple', 'Pear', 'Hourglass', 'Rectangle', 'Petite'].map((type) => (
              <Button
                key={type}
                variant={formData.bodyType === type ? 'default' : 'outline'}
                className={`rounded-full ${formData.bodyType === type ? 'bg-rose-gold text-white' : ''}`}
                onClick={() => setFormData({ ...formData, bodyType: type as any })}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-12 border-t">
        <Button variant="ghost" onClick={() => setStep(1)} className="text-muted-foreground">
          <ChevronLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button onClick={handleGenerate} size="lg" className="rounded-full bg-deep-plum text-champagne-gold px-12 h-14">
          <Sparkles className="mr-2 h-5 w-5" /> Generate My Look
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (loading) {
      return (
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
          <div className="space-y-4 text-center">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-[3/4] rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
          </div>
        </div>
      );
    }

    if (!result) return null;

    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <Badge className="bg-rose-gold text-white rounded-full px-4 mb-2">Complete {formData.occasion} Look</Badge>
            <h1 className="text-4xl md:text-5xl font-headline italic leading-tight">Your Curated Ensemble</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Outfit Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
              <Image 
                src={result.outfit.imageUrl} 
                alt={result.outfit.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-deep-plum font-bold border-none">
                  {result.outfit.brand}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-2xl font-bold">₹{result.outfit.price.toLocaleString()}</p>
                <h3 className="text-xl font-headline italic">{result.outfit.name}</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-rose-gold pl-4">
              "{result.lookDescription}"
            </p>
          </div>

          {/* Accessories Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Footwear */}
              <Card className="border-none shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-0 flex h-40">
                  <div className="w-1/3 relative bg-muted">
                    <Image src={result.footwear.imageUrl} alt="Footwear" fill className="object-cover" />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-center">
                    <p className="text-xs font-bold text-rose-gold uppercase tracking-tighter">Footwear</p>
                    <h4 className="font-headline font-bold text-lg">{result.footwear.name}</h4>
                    <p className="text-sm text-muted-foreground">{result.footwear.brand} • ₹{result.footwear.price}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Jewellery */}
              <Card className="border-none shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-0 flex h-40">
                  <div className="w-1/3 relative bg-muted">
                    <Image src={result.jewellery.imageUrl} alt="Jewellery" fill className="object-cover" />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-center">
                    <p className="text-xs font-bold text-rose-gold uppercase tracking-tighter">Jewellery</p>
                    <h4 className="font-headline font-bold text-lg leading-tight">{result.jewellery.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{result.jewellery.price}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Bag */}
              <Card className="border-none shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-0 flex h-40">
                  <div className="w-1/3 relative bg-muted">
                    <Image src={result.bag.imageUrl} alt="Bag" fill className="object-cover" />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-center">
                    <p className="text-xs font-bold text-rose-gold uppercase tracking-tighter">Accessories</p>
                    <h4 className="font-headline font-bold text-lg">{result.bag.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{result.bag.price}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Makeup */}
              <Card className="border-none shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <p className="text-xs font-bold text-rose-gold uppercase tracking-tighter">Beauty Palette</p>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full border shadow-sm" style={{ backgroundColor: result.makeup.lipstickHex }} />
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Lips</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full border shadow-sm" style={{ backgroundColor: result.makeup.eyeshadowHex }} />
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Eyes</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full border shadow-sm" style={{ backgroundColor: result.makeup.blushHex }} />
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Blush</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full border shadow-sm" style={{ backgroundColor: result.nails.nailColorHex }} />
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Nails</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary & Buy */}
            <div className="bg-deep-plum rounded-3xl p-8 text-champagne-gold flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Total Ensemble Price</p>
                <p className="text-5xl font-headline italic">₹{result.totalPrice.toLocaleString()}</p>
              </div>
              <Button size="lg" className="w-full sm:w-auto rounded-full h-16 px-12 text-lg bg-rose-gold hover:bg-rose-gold/90 border-none text-white">
                <ShoppingBag className="mr-2 h-6 w-6" /> Buy All Items
              </Button>
            </div>

            <div className="flex justify-center">
               <Button variant="link" onClick={() => setStep(2)} className="text-muted-foreground">
                 Not quite right? Regenerate options
               </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-soft-ivory py-20 px-4">
      <div className="container mx-auto">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}