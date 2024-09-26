import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_REFRESH_KEY } from "../../constants";

const prisma = new PrismaClient();

interface TokenDetails {
  tokenDetails: JwtPayload | string;
  error: boolean;
  message: string;
}

const verifyRefreshToken = async (refreshToken: string): Promise<TokenDetails> => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }
 try {
    const userRefreshToken = await prisma.token.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!userRefreshToken) {
      throw new Error("Invalid refresh token");
    }

    const tokenDetails = jwt.verify(refreshToken, JWT_REFRESH_KEY as string) as JwtPayload;

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid refresh token");
    }
    if (error.name === "TokenExpiredError") {
      throw new Error("Refresh token expired");
    }
    throw new Error("Failed to verify refresh token");
  }
};

export default verifyRefreshToken;
