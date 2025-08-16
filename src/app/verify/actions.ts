'use server';

import { summarizeFinancialUrl } from '@/ai/flows/summarize-financial-url';
import { z } from 'zod';

const FormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  language: z.string(),
});

export type FormState = {
  message: string;
  summary?: string;
  fullTranslatedDocument?: string;
  success: boolean;
};

export async function handleSummarizeUrl(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    url: formData.get('url'),
    language: formData.get('language'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input. Please check the URL.',
      success: false,
    };
  }

  try {
    const result = await summarizeFinancialUrl(validatedFields.data);
    if (result.summary && result.fullTranslatedDocument) {
      return {
        message: 'Summary generated successfully.',
        summary: result.summary,
        fullTranslatedDocument: result.fullTranslatedDocument,
        success: true,
      };
    } else {
      return { message: 'Failed to generate summary and translated document.', success: false };
    }
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred.', success: false };
  }
}
