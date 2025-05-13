'use server';

/**
 * @fileOverview AI agent that suggests tasks appropriate for the current time of day.
 *
 * - suggestTasks - A function that suggests tasks for the user.
 * - SuggestTasksInput - The input type for the suggestTasks function.
 * - SuggestTasksOutput - The return type for the suggestTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTasksInputSchema = z.object({
  timeOfDay: z
    .string()
    .describe(
      'The current time of day, e.g., morning, afternoon, evening, or night.'
    ),
  dayOfWeek: z.string().describe('The current day of the week.'),
  userPreferences: z
    .string()
    .optional()
    .describe('Optional: The preferences of the user, as a string.'),
});
export type SuggestTasksInput = z.infer<typeof SuggestTasksInputSchema>;

const SuggestTasksOutputSchema = z.object({
  tasks: z.array(
    z.string().describe('A suggested task appropriate for the given time.')
  ),
});
export type SuggestTasksOutput = z.infer<typeof SuggestTasksOutputSchema>;

export async function suggestTasks(input: SuggestTasksInput): Promise<SuggestTasksOutput> {
  return suggestTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTasksPrompt',
  input: {schema: SuggestTasksInputSchema},
  output: {schema: SuggestTasksOutputSchema},
  prompt: `You are a helpful AI assistant that suggests tasks to users based on the current time of day and day of the week.

You should return a JSON array of strings, where each string is a suggested task. Return at most 5 suggestions.

Consider these optional user preferences when creating the suggestions: {{{userPreferences}}}

Suggest tasks for the {{timeOfDay}} on {{dayOfWeek}}.`,
});

const suggestTasksFlow = ai.defineFlow(
  {
    name: 'suggestTasksFlow',
    inputSchema: SuggestTasksInputSchema,
    outputSchema: SuggestTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
