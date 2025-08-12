import { PrismaClient } from '@prisma/client';
import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import { AuthError, handleError } from '../../errors';
import { LoginResponse } from '../../types/types.response';

type RefreshTokenResponse = Omit<LoginResponse, 'data'> & {
  data: {
    accessToken: {
      token: string;
    };
  };
};

export async function refresh(
  input: { refreshToken: string },
  prisma: PrismaClient,
): Promise<RefreshTokenResponse | undefined> {
  try {
    const { refreshToken } = input;

    // Check refresh token validity in DB
    const dbRefreshToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!dbRefreshToken || dbRefreshToken.expiresAt < new Date()) {
      console.log('Refresh token not found or expired');
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });

      throw new AuthError('Refresh token is invalid or expired');
    }

    const decoded = verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as Secret,
    ) as { userId: string };

    // Generate new access token
    const newAccessToken = sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_TOKEN_SECRET as Secret,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '1h',
      } as SignOptions,
    );

    return {
      success: true,
      data: {
        accessToken: {
          token: newAccessToken,
        },
      },
    };
  } catch (err) {
    handleError(err);
  }
}
