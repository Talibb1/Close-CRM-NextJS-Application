import { Request, Response, NextFunction } from 'express';
import refreshAccessToken from '../utils/refreshAccessToken/refreshAccessToken';
import isTokenExpired from '../utils/refreshAccessToken/isTokenExpired';
import setTokensCookies from '../utils/generateToken/setTokenCookies';

interface RefreshTokenResponse {
  newAccessToken: string;
  newRefreshToken: string;
  newAccessTokenExp: number;
  newRefreshTokenExp: number;
}

const accessTokenAutoRefresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken && !isTokenExpired(accessToken)) {
      req.headers['authorization'] = `Bearer ${accessToken}`;
    } else {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          status: 'failed',
          message: 'Refresh token is missing',
        });
      }

      const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp }: RefreshTokenResponse =
        await refreshAccessToken(req, res);

      setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);
      req.headers['authorization'] = `Bearer ${newAccessToken}`;
    }

    next();
  } catch (error: any) {
    console.error('Error in accessTokenAutoRefresh middleware:', error.message);
    res.status(401).json({
      status: 'failed',
      message: 'Unauthorized access or token refresh failed',
    });
  }
};

export default accessTokenAutoRefresh;
