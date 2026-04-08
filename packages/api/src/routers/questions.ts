import { initTRPC } from '@trpc/server';
import { QuestionService } from '../services/QuestionService';

const t = initTRPC.create();

const questionService = new QuestionService();

export const questionRouter = t.router({
  list: t.procedure.query(async () => {
    return questionService.getQuestions();
  }),
  search: t.procedure.input((input: unknown) => input as { query: string }).query(async ({ input }) => {
    return questionService.searchQuestions(input.query);
  }),
});
