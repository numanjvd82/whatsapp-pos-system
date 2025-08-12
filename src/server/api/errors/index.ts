import { TRPCError } from '@trpc/server';
import { ZodError } from 'zod';

export class NotFoundError extends TRPCError {
  constructor(message: string) {
    super({
      code: 'NOT_FOUND',
      message,
    });
  }
}

export class AuthError extends TRPCError {
  constructor(message: string) {
    super({
      code: 'UNAUTHORIZED',
      message,
    });
  }
}

export class ValidationError extends TRPCError {
  constructor(message: string) {
    super({
      code: 'BAD_REQUEST',
      message,
    });
  }
}

export class ConflictError extends TRPCError {
  constructor(message: string) {
    super({
      code: 'CONFLICT',
      message,
    });
  }
}

export class InternalError extends TRPCError {
  constructor(message: string = 'Internal server error') {
    super({
      code: 'INTERNAL_SERVER_ERROR',
      message,
    });
  }
}

export class TokenExpiredError extends TRPCError {
  constructor(message: string = 'Token has expired') {
    super({
      code: 'UNAUTHORIZED',
      message,
    });
  }
}

export class ForbiddenError extends TRPCError {
  constructor(message: string = 'Forbidden') {
    super({
      code: 'FORBIDDEN',
      message,
    });
  }
}

// Error handler utility
export const handleError = (error: unknown): never => {
  if (error instanceof TRPCError) {
    throw error;
  }

  if (error instanceof ZodError) {
    throw new ValidationError(
      `Validation failed: ${error.issues.map((issue) => issue.message).join(', ')}`,
    );
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Unhandled error:', error);
  }
  throw new InternalError('An unexpected error occurred');
};
