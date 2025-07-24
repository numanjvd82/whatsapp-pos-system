import { SerializeOptions } from 'cookie';
import { loginSchema, signUpSchema } from '../../../schemas/auth.schema';
import { AuthError, handleError } from '../errors';
import { authModel } from '../models/auth';
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
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx: { prisma, setCookie } }) => {
      try {
        const tokens = await authModel.login(input, prisma);
        if (!tokens?.data) {
          throw new AuthError('Login failed');
        }
        const refreshTokenCookieOptions: SerializeOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 2, // 2 minutes
        };
        setCookie('refreshToken', tokens.data.refreshToken, {
          refreshToken: refreshTokenCookieOptions,
        });
        return tokens.data.accessToken;
      } catch (error) {
        handleError(error);
      }
    }),
  refresh: publicProcedure.query(async ({ ctx: { prisma, getCookie } }) => {
    try {
      const refreshToken = getCookie('refreshToken');
      if (!refreshToken) throw new AuthError('No refresh token provided');
      const tokens = await authModel.refresh({ refreshToken }, prisma);
      if (!tokens?.data) {
        throw new AuthError('Refresh token is invalid or expired');
      }
      return tokens.data;
    } catch (error) {
      handleError(error);
    }
  }),
});
