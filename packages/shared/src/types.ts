import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  votes: z.number(),
  answerCount: z.number(),
  views: z.number(),
  createdAt: z.date(),
  author: z.string(),
});

export type Question = z.infer<typeof QuestionSchema>;
