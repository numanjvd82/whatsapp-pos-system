import z from 'zod';
import { signUpSchema } from '../../../../schemas/auth.schema';
import { ConflictError } from '@/server/api/errors';
import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

export type Input = z.infer<typeof signUpSchema>;

type SignUpResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
};

export const signUp = async (
  input: Input,
  prisma: PrismaClient,
): Promise<SignUpResponse> => {
  const validatedInput = signUpSchema.parse(input);

  const userExists = await prisma.user.findUnique({
    where: { email: validatedInput.email },
  });

  if (userExists) {
    throw new ConflictError('User with this email already exists.');
  }

  // Hash the password before saving
  const hashedPassword = await hash(validatedInput.password, 10);
  validatedInput.password = hashedPassword;

  const newUser = await prisma.user.create({
    data: {
      email: validatedInput.email,
      passwordHash: validatedInput.password,
      name: validatedInput.name,
    },
  });

  if (!newUser) {
    throw new ConflictError('Failed to create user. Please try again later.');
  }

  return {
    message: 'User created successfully',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  };
};
