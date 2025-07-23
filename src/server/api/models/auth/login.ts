import { loginSchema } from '@/schemas/auth.schema';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { NotFoundError } from '../../errors';
import { compare } from 'bcrypt';
import { Secret, sign, SignOptions } from 'jsonwebtoken';

type Input = z.infer<typeof loginSchema>;

export const login = async (
  input: Input,
  prisma: PrismaClient,
): Promise<string> => {
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

  // sign a jwt token
  const token = sign(
    { id: user.id },
    process.env.JWT_ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '1h',
    } as SignOptions,
  );

  if (!token) {
    throw new Error('Failed to generate token');
  }

  return token;
};
