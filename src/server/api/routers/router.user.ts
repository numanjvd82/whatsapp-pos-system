import { AuthError } from '../errors';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) {
      throw new AuthError('User not authenticated');
    }
    return ctx.session.user;
  }),
});
