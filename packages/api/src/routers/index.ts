import { initTRPC } from '@trpc/server';
import { questionRouter } from './questions';

const t = initTRPC.create();

export const appRouter = t.router({
  questions: questionRouter,
});

export type AppRouter = typeof appRouter;
