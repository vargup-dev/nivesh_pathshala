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
import pdf from 'pdf-parse';


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


const SummarizeDocumentInputSchema = z.object({
  documentText: z.string().describe('The text content of the document to summarize.'),
  language: z.string().describe('The target language for the summary.'),
});


export async function summarizeFinancialUrl(input: SummarizeFinancialUrlInput): Promise<SummarizeFinancialUrlOutput> {
  const response = await fetch(input.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  const data = await pdf(buffer);
  
  return summarizeFinancialUrlFlow({
    documentText: data.text,
    language: input.language,
  });
}

const summarizeFinancialUrlPrompt = ai.definePrompt({
  name: 'summarizeFinancialUrlPrompt',
  input: {schema: SummarizeDocumentInputSchema},
  output: {schema: SummarizeFinancialUrlOutputSchema},
  prompt: `You are an expert financial analyst and translator. Your job is to take the following document text, and perform two tasks:
  
  1.  Translate the ENTIRE document into the target language.
  2.  Provide a detailed, elaborate summary of the document in the same target language. This summary should cover all key points in a comprehensive manner so a user can understand the document without reading it fully.

  Return both the full translated text and the summary.

  Document Content: {{{documentText}}}
  Language: {{{language}}}`, 
});

const summarizeFinancialUrlFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialUrlFlow',
    inputSchema: SummarizeDocumentInputSchema,
    outputSchema: SummarizeFinancialUrlOutputSchema,
  },
  async input => {
    const {output} = await summarizeFinancialUrlPrompt(input);
    return output!;
  }
);
