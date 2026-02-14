'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Sparkles, RefreshCcw, Palette } from 'lucide-react';
import { matchColorPaletteFromImage, type MatchColorPaletteFromImageOutput } from '@/ai/flows/match-color-palette-from-image';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function PaletteMatcher() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchColorPaletteFromImageOutput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const output = await matchColorPaletteFromImage({ garmentImageDataUri: image });
      setResult(output);
    } catch (error) {
      console.error('Failed to match palette:', error);
    } finally {
      setLoading(false);
    }
  };

  const ColorSwatch = ({ hex, label }: { hex: string; label?: string }) => (
    <div className="flex flex-col items-center space-y-2">
      <div 
        className="w-12 h-12 rounded-full border shadow-md" 
        style={{ backgroundColor: hex }} 
      />
      {label && <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{label}</span>}
      <span className="text-[10px] font-mono opacity-60">{hex}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-ivory py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-rose-gold text-white rounded-full px-4 py-1 mb-2">AI Color Intelligence</Badge>
          <h1 className="text-5xl md:text-6xl font-headline italic">Color Palette Matcher</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Upload your outfit and let LookSync curate the perfect harmonizing palette for your accessories.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div 
              className={`relative aspect-[3/4] rounded-3xl border-4 border-dashed border-rose-gold/20 flex flex-col items-center justify-center overflow-hidden transition-all bg-white ${
                !image ? 'hover:bg-rose-gold/5' : ''
              }`}
            >
              {image ? (
                <>
                  <Image src={image} alt="Uploaded" fill className="object-cover" />
                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-full shadow-lg"
                      onClick={() => setImage(null)}
                    >
                      <RefreshCcw className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6 p-12">
                  <div className="w-24 h-24 rounded-full bg-rose-gold/10 flex items-center justify-center mx-auto">
                    <Camera className="h-10 w-10 text-rose-gold" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-headline italic">Upload Your Fabric</p>
                    <p className="text-sm text-muted-foreground">Take a photo of your dress or saree to find matching accessories.</p>
                  </div>
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="rounded-full px-8 bg-rose-gold text-white"
                  >
                    <Upload className="mr-2 h-5 w-5" /> Select Photo
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                  />
                </div>
              )}
            </div>
            {image && !result && (
              <Button 
                onClick={handleAnalyze} 
                className="w-full h-14 rounded-full bg-deep-plum text-champagne-gold text-lg"
                disabled={loading}
              >
                {loading ? <RefreshCcw className="animate-spin mr-2 h-5 w-5" /> : <Sparkles className="mr-2 h-5 w-5" />}
                {loading ? 'Analyzing Tones...' : 'Match My Colors'}
              </Button>
            )}
          </div>

          {/* Result Section */}
          <div className="space-y-8">
            {!result ? (
              <Card className="h-full border-none shadow-none bg-rose-gold/5 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Palette className="h-16 w-16 mb-6 opacity-20" />
                <p className="font-headline text-xl italic opacity-40">Your results will appear here</p>
              </Card>
            ) : (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold uppercase tracking-widest text-deep-plum">Extracted Dominant Color</h2>
                  <div className="flex items-center space-x-6 p-6 bg-white rounded-3xl shadow-sm border">
                    <div 
                      className="w-20 h-20 rounded-2xl shadow-inner border" 
                      style={{ backgroundColor: result.dominantColorHex }} 
                    />
                    <div>
                      <p className="text-2xl font-mono font-bold">{result.dominantColorHex}</p>
                      <p className="text-sm text-muted-foreground font-light">{result.colorHarmonyDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold uppercase tracking-widest text-deep-plum">Curated Recommendations</h2>
                  
                  <div className="grid gap-6">
                    <Card className="border-none shadow-lg bg-white p-8 rounded-3xl">
                      <div className="space-y-6">
                        <div className="flex flex-col space-y-4">
                          <Label className="text-xs font-bold uppercase tracking-[0.2em] text-rose-gold">Lipstick Shades</Label>
                          <div className="flex gap-4">
                            {result.harmonizingSuggestions.lipstickShades.map((hex, i) => (
                              <ColorSwatch key={i} hex={hex} label={`Shade ${i+1}`} />
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                          <Label className="text-xs font-bold uppercase tracking-[0.2em] text-rose-gold">Footwear & Bags</Label>
                          <div className="flex flex-wrap gap-4">
                            {result.harmonizingSuggestions.footwearColors.map((hex, i) => (
                              <ColorSwatch key={i} hex={hex} label="Shoes" />
                            ))}
                            {result.harmonizingSuggestions.bagColors.map((hex, i) => (
                              <ColorSwatch key={i} hex={hex} label="Bag" />
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-4">
                          <Label className="text-xs font-bold uppercase tracking-[0.2em] text-rose-gold">Metal Tones</Label>
                          <div className="flex gap-3">
                            {result.harmonizingSuggestions.jewelryMetalTones.map((metal, i) => (
                              <Badge key={i} variant="outline" className="px-4 py-2 border-champagne-gold text-deep-plum bg-champagne-gold/20">
                                {metal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <Button variant="link" onClick={() => setResult(null)} className="text-rose-gold w-full text-lg italic">
                  Match another outfit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}