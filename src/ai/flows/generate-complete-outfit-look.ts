'use server';
/**
 * @fileOverview A Genkit flow for generating a complete, coordinated outfit look based on user preferences.
 *
 * - generateCompleteOutfitLook - A function that handles the generation of a complete outfit look.
 * - GenerateCompleteOutfitLookInput - The input type for the generateCompleteOutfitLook function.
 * - GenerateCompleteOutfitLookOutput - The return type for the generateCompleteOutfitLook function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const GenerateCompleteOutfitLookInputSchema = z.object({
  occasion: z.enum([
    'Bridal',
    'Mehndi',
    'Sangeet',
    'Reception',
    'Eid',
    'Diwali',
    'Office',
    'Casual',
    'Date Night',
    'Festive',
  ]).describe('The occasion for which the look is being generated.'),
  budgetMin: z.number().min(0).describe('Minimum budget in INR.'),
  budgetMax: z.number().min(0).describe('Maximum budget in INR.'),
  skinTone: z.enum([
    'Fair',
    'Wheatish',
    'Medium',
    'Dusky',
    'Deep',
  ]).describe('The user\'s skin tone.'),
  bodyType: z.enum([
    'Apple',
    'Pear',
    'Hourglass',
    'Rectangle',
    'Petite',
  ]).describe('The user\'s body type.'),
  stylePreference: z.enum([
    'Traditional',
    'Indo-Western',
    'Western',
    'Minimalist',
    'Maximalist',
  ]).describe('The user\'s style preference.'),
  colorPreference: z.string().optional().describe('An optional preferred color (e.g., "red", "emerald green") or "Surprise me" if no specific color is desired.'),
});

export type GenerateCompleteOutfitLookInput = z.infer<typeof GenerateCompleteOutfitLookInputSchema>;

// Shared Product Item Schema
const ProductItemSchema = z.object({
  name: z.string().describe('Name of the product.'),
  brand: z.string().describe('Brand of the product.'),
  price: z.number().describe('Price of the product in INR.'),
  imageUrl: z.string().url().describe('URL to the product image.'),
  buyLink: z.string().url().describe('URL to buy the product.'),
});

// Output Schema
const GenerateCompleteOutfitLookOutputSchema = z.object({
  lookDescription: z.string().describe('A brief description of the generated look.'),
  outfit: ProductItemSchema.extend({
    description: z.string().describe('A detailed description of the outfit.'),
  }).describe('The main outfit item.'),
  footwear: ProductItemSchema.describe('The matching footwear item.'),
  jewellery: ProductItemSchema.describe('The matching jewellery set.'),
  bag: ProductItemSchema.describe('The matching bag or clutch.'),
  makeup: z.object({
    lipstickHex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('HEX code for suggested lipstick color.'),
    eyeshadowHex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('HEX code for suggested eyeshadow color.'),
    blushHex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('HEX code for suggested blush color.'),
  }).describe('Suggested makeup palette with HEX codes.'),
  nails: z.object({
    nailColorHex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('HEX code for suggested nail color.'),
  }).describe('Suggested nail color with HEX code.'),
  totalPrice: z.number().describe('The estimated total price for all physical items in the look.'),
});

export type GenerateCompleteOutfitLookOutput = z.infer<typeof GenerateCompleteOutfitLookOutputSchema>;

// Prompt definition
const generateOutfitPrompt = ai.definePrompt({
  name: 'generateOutfitPrompt',
  input: { schema: GenerateCompleteOutfitLookInputSchema },
  output: { schema: GenerateCompleteOutfitLookOutputSchema },
  prompt: `You are an expert Indian fashion stylist and AI assistant named LookSync. Your goal is to generate a complete, coordinated outfit look for women based on the provided preferences. Ensure that all suggested items (outfit, footwear, jewellery, bag, makeup, and nails) are harmoniously color-coordinated and suitable for the specified occasion.

Strictly adhere to the budget, skin tone, body type, and style preferences. For product suggestions, use realistic Indian brand names, product names, prices, and provide placeholder image URLs and buy links that are valid URLs. The image URLs should point to a placeholder image service (e.g., 'https://via.placeholder.com/200') and the buy links should point to a dummy e-commerce page (e.g., 'https://example.com/product/123').

The colorPreference is optional. If provided, incorporate it strongly into the look. If 'Surprise me' or not provided, choose a beautiful color palette suitable for the occasion and preferences.

Generate a complete JSON object adhering strictly to the provided output schema. Do not include any additional text or formatting outside of the JSON.

Occasion: {{{occasion}}}
Budget: From ₹{{{budgetMin}}} to ₹{{{budgetMax}}}
Skin Tone: {{{skinTone}}}
Body Type: {{{bodyType}}}
Style Preference: {{{stylePreference}}}
Color Preference: {{{colorPreference}}}

Example of a detailed product item:
{
  "name": "Kanjivaram Silk Saree",
  "brand": "Nalli Silks",
  "price": 25000,
  "imageUrl": "https://via.placeholder.com/200/FF0000/FFFFFF?text=RedSaree",
  "buyLink": "https://example.com/product/kanjivaram-saree"
}
`
});

// Flow definition
const generateCompleteOutfitLookFlow = ai.defineFlow(
  {
    name: 'generateCompleteOutfitLookFlow',
    inputSchema: GenerateCompleteOutfitLookInputSchema,
    outputSchema: GenerateCompleteOutfitLookOutputSchema,
  },
  async (input) => {
    const { output } = await generateOutfitPrompt(input);
    return output!;
  }
);

// Wrapper function
export async function generateCompleteOutfitLook(input: GenerateCompleteOutfitLookInput): Promise<GenerateCompleteOutfitLookOutput> {
  return generateCompleteOutfitLookFlow(input);
}
