import { Request, Response } from 'express';
import { PrismaClient, TokenType } from '@prisma/client'; 
import generateTokens from '../generateToken/generateToken';
import verifyRefreshToken from './verifyRefreshToken';

const prisma = new PrismaClient();
const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Refresh token not provided' });
    }

    // Verify Refresh Token
    const { tokenDetails } = await verifyRefreshToken(oldRefreshToken);

    // Find the User based on the refresh token details
    const user = await prisma.user.findUnique({
      where: { id: tokenDetails._id },
    });

    if (!user) {
      return res.status(404).json({ status: 'failed', message: 'User not found' });
    }

    // Fetch the refresh token from the database with type REFRESH
    const userRefreshToken = await prisma.token.findFirst({
      where: {
        userId: tokenDetails._id,
        token: oldRefreshToken,
        type: TokenType.REFRESH, 
      },
    });

    if (!userRefreshToken) {
      return res
        .status(401)
        .json({ status: 'failed', message: 'Unauthorized access or token not found' });
    }

    // Check if the token is expired
    if (new Date() > new Date(userRefreshToken.expiresAt)) {
      return res.status(401).json({ status: 'failed', message: 'Refresh token expired' });
    }

    // Generate new access and refresh tokens
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokens(user);

    // Update the refresh token in the database
    await prisma.token.update({
      where: { id: userRefreshToken.id },
      data: { token: refreshToken, expiresAt: new Date(refreshTokenExp) }
    });


    return res.status(200).json({
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    });
  } catch (error: any) {
    if (error.message === 'Invalid refresh token' || error.message === 'Unauthorized access') {
      return res.status(401).json({ status: 'failed', message: error.message });
    }
    return res.status(500).json({ status: 'failed', message: 'Internal server error' });
  }
};

export default refreshAccessToken;
