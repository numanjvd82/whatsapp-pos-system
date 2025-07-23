import { handleError } from '../errors';
import { authModel } from '../models/auth';
import { signUpSchema } from '../../../schemas/auth.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx: { prisma } }) => {
      try {
        return await authModel.signUp(input, prisma);
      } catch (error) {
        handleError(error);
      }
    }),
});
