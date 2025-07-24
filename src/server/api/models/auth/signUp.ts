import { ConflictError, handleError } from '@/server/api/errors';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import z from 'zod';
import { signUpSchema } from '../../../../schemas/auth.schema';
import { SignUpResponse } from '../../types/response';

export type Input = z.infer<typeof signUpSchema>;

export const signUp = async (
  input: Input,
  prisma: PrismaClient,
): Promise<SignUpResponse | undefined> => {
  try {
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
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name || '',
        },
        message: 'User created successfully',
      },
    };
  } catch (error) {
    handleError(error);
  }
};
