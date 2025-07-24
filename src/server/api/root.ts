import { createTRPCRouter } from '@/server/api/trpc';
import { authRouter } from '@/server/api/routers/router.auth';
import { userRouter } from './routers/router.user';
// import { itemsRouter } from '@/server/api/routers/items';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
