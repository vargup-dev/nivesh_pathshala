'use server';

/**
 * @fileOverview A flow that summarizes and translates financial URLs into the user's language.
 *
 * - summarizeFinancialUrl - A function that handles the summarization and translation process.
 * - SummarizeFinancialUrlInput - The input type for the summarizeFinancialUrl function.
 * - SummarizeFinancialUrlOutput - The return type for the summarizeFinancialUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFinancialUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the SEBI/NISM document to summarize.'),
  language: z.string().describe('The target language for the summary.'),
});
export type SummarizeFinancialUrlInput = z.infer<typeof SummarizeFinancialUrlInputSchema>;

const SummarizeFinancialUrlOutputSchema = z.object({
  summary: z.string().describe('The summary of the document in the target language.'),
  fullTranslatedDocument: z.string().describe('The full content of the document, translated into the target language.'),
});
export type SummarizeFinancialUrlOutput = z.infer<typeof SummarizeFinancialUrlOutputSchema>;

export async function summarizeFinancialUrl(input: SummarizeFinancialUrlInput): Promise<SummarizeFinancialUrlOutput> {
  return summarizeFinancialUrlFlow(input);
}

const summarizeFinancialUrlPrompt = ai.definePrompt({
  name: 'summarizeFinancialUrlPrompt',
  input: {schema: SummarizeFinancialUrlInputSchema},
  output: {schema: SummarizeFinancialUrlOutputSchema},
  prompt: `You are an expert financial analyst and translator. Your job is to take a URL of a SEBI/NISM document, read its contents, and perform two tasks:
  
  1.  Translate the ENTIRE document into the target language.
  2.  Provide a detailed, elaborate summary of the document in the same target language. This summary should cover all key points in a comprehensive manner so a user can understand the document without reading it fully.

  Return both the full translated text and the summary.

  URL: {{{url}}}
  Language: {{{language}}}`, 
});

const summarizeFinancialUrlFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialUrlFlow',
    inputSchema: SummarizeFinancialUrlInputSchema,
    outputSchema: SummarizeFinancialUrlOutputSchema,
  },
  async input => {
    const {output} = await summarizeFinancialUrlPrompt(input);
    return output!;
  }
);
