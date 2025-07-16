import { handleError } from '../errors';
import { authModel } from '../models/auth';
import { signUpSchema } from '../../../schemas/auth.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    try {
      return await authModel.signUp(input);
    } catch (error) {
      handleError(error);
    }
  }),
});
