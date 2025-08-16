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
});
export type SummarizeFinancialUrlOutput = z.infer<typeof SummarizeFinancialUrlOutputSchema>;

export async function summarizeFinancialUrl(input: SummarizeFinancialUrlInput): Promise<SummarizeFinancialUrlOutput> {
  return summarizeFinancialUrlFlow(input);
}

const summarizeFinancialUrlPrompt = ai.definePrompt({
  name: 'summarizeFinancialUrlPrompt',
  input: {schema: SummarizeFinancialUrlInputSchema},
  output: {schema: SummarizeFinancialUrlOutputSchema},
  prompt: `You are an expert financial analyst specializing in summarizing SEBI/NISM documents.  Your job is to take a URL, read the contents of the URL, and provide a summary in the target language.

  Make sure you summarize all the key points of the document, and present it in a clear, concise way so that the user can quickly understand the key points without reading the entire document.

  URL: {{{url}}}
  Language: {{{language}}}
  Summary:`, 
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
