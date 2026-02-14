'use server';
/**
 * @fileOverview A Genkit flow for analyzing the dominant color in a user-uploaded garment image and suggesting harmonizing accessories and makeup.
 *
 * - matchColorPaletteFromImage - A function that handles the color palette matching process.
 * - MatchColorPaletteFromImageInput - The input type for the matchColorPaletteFromImage function.
 * - MatchColorPaletteFromImageOutput - The return type for the matchColorPaletteFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchColorPaletteFromImageInputSchema = z.object({
  garmentImageDataUri: z
    .string()
    .describe(
      "A photo of a garment, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MatchColorPaletteFromImageInput = z.infer<
  typeof MatchColorPaletteFromImageInputSchema
>;

const MatchColorPaletteFromImageOutputSchema = z.object({
  dominantColorHex: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid HEX color code (e.g., #RRGGBB).')
    .describe('The HEX code of the dominant color extracted from the garment.'),
  harmonizingSuggestions: z
    .object({
      footwearColors: z
        .array(z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid HEX color code (e.g., #RRGGBB).'))
        .describe(
          'An array of HEX codes for suggested footwear colors that harmonize with the dominant color.'
        ),
      lipstickShades: z
        .array(z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid HEX color code (e.g., #RRGGBB).'))
        .describe(
          'An array of HEX codes for suggested lipstick shades that harmonize with the dominant color.'
        ),
      jewelryMetalTones: z
        .array(z.enum(['Gold', 'Silver', 'Rose Gold', 'Bronze']))
        .describe(
          'An array of suggested jewelry metal tones (e.g., "Gold", "Silver", "Rose Gold", "Bronze") that harmonize with the dominant color.'
        ),
      bagColors: z
        .array(z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid HEX color code (e.g., #RRGGBB).'))
        .describe(
          'An array of HEX codes for suggested bag colors that harmonize with the dominant color.'
        ),
    })
    .describe('Suggestions for harmonizing items based on the dominant color.'),
  colorHarmonyDescription: z
    .string()
    .describe(
      'A description of the color harmony strategy used (e.g., "analogous", "complementary", "triadic") and how the suggested colors relate to the dominant color, enabling a visual color harmony wheel representation.'
    ),
});
export type MatchColorPaletteFromImageOutput = z.infer<
  typeof MatchColorPaletteFromImageOutputSchema
>;

export async function matchColorPaletteFromImage(
  input: MatchColorPaletteFromImageInput
): Promise<MatchColorPaletteFromImageOutput> {
  return matchColorPaletteFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchColorPaletteFromImagePrompt',
  input: {schema: MatchColorPaletteFromImageInputSchema},
  output: {schema: MatchColorPaletteFromImageOutputSchema},
  model: 'googleai/gemini-2.5-flash-image', // Explicitly use the multi-modal model
  prompt: `You are an expert AI stylist and color theory specialist for Indian fashion.\n  \nAnalyze the dominant color in the provided garment image. Based on this dominant color, suggest harmonizing colors/styles for footwear, lipstick, jewelry metal tones, and bag colors suitable for an Indian occasion. Ensure all suggested colors are provided as HEX codes (e.g., #RRGGBB), except for jewelry metal tones which should be descriptive names from the enum ['Gold', 'Silver', 'Rose Gold', 'Bronze'].\n\nAlso, describe the color harmony strategy that ties these suggestions together (e.g., analogous, complementary, triadic, monochromatic, split-complementary), and explicitly mention the main colors involved in that harmony.\n\nProvide your response in JSON format.\n\nGarment Image: {{media url=garmentImageDataUri}}`,
});

const matchColorPaletteFromImageFlow = ai.defineFlow(
  {
    name: 'matchColorPaletteFromImageFlow',
    inputSchema: MatchColorPaletteFromImageInputSchema,
    outputSchema: MatchColorPaletteFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
