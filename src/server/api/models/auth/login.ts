import { loginSchema } from '@/schemas/auth.schema';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { handleError, NotFoundError } from '../../errors';
import { compare } from 'bcrypt';
import { Secret, sign, SignOptions } from 'jsonwebtoken';
import { LoginResponse } from '../../types/response';
import dayjs from 'dayjs';

type Input = z.infer<typeof loginSchema>;

export const login = async (
  input: Input,
  prisma: PrismaClient,
): Promise<LoginResponse | undefined> => {
  try {
    const validatedInput = loginSchema.parse(input);

    // check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { email: validatedInput.email },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // compare password with the stored hash
    const isPasswordValid = await compare(
      validatedInput.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new NotFoundError('Invalid email or password');
    }

    // sign both access and refresh tokens
    const accessToken = sign(
      { id: user.id },
      process.env.JWT_ACCESS_TOKEN_SECRET as Secret,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '1h',
      } as SignOptions,
    );
    const refreshToken = sign(
      { id: user.id },
      process.env.JWT_REFRESH_TOKEN_SECRET as Secret,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN ?? '7d',
      } as SignOptions,
    );

    // store the refresh token in the refreshToken table only to avoid redundancy.
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        // expiresAt: dayjs().add(7, 'day').toISOString(), production should handle this
        expiresAt: dayjs().add(10, 'minute').toISOString(), // for development purposes
      },
    });

    if (!accessToken || !refreshToken) {
      throw new Error('Failed to generate token');
    }

    return {
      success: true,
      data: {
        accessToken: {
          token: accessToken,
          expiresIn: dayjs().add(5, 'minute').toISOString(),
        },
        refreshToken,
      },
    };
  } catch (error) {
    handleError(error);
  }
};
