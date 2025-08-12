import { handleError } from '@/server/api/errors';
import { Prisma, PrismaClient } from '@prisma/client';
import { parse } from 'cookie';
import { JwtPayload, TokenExpiredError, verify } from 'jsonwebtoken';

export type PartialUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    businessName: true;
    phone: true;
    role: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export async function getServerSession(
  req: Request,
  prisma: PrismaClient,
): Promise<PartialUser | null> {
  const cookieHeader = req.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const token = cookies['refreshToken'];

  if (!token) {
    return null;
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET!,
    ) as JwtPayload as {
      id: string;
    };

    if (!decoded || !decoded.id) {
      return null;
    }

    // fetch user from database
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      omit: {
        passwordHash: true,
      },
    });

    if (!user) {
      return null;
    }

    return user as PartialUser;
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      console.warn('Refresh token expired, clearing cookie.');
      return null;
    }
    handleError(error);
    return null;
  }
}
