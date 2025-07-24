import { handleError } from '@/server/api/errors';
import { Prisma, PrismaClient } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';

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
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET!,
    ) as JwtPayload as {
      userId: string;
    };

    // fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        businessName: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return user as PartialUser;
  } catch (error) {
    handleError(error);
    return null;
  }
}
