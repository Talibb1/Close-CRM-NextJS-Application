// import { Request, Response, NextFunction } from 'express';
// import isTokenExpired from '../utils/RefreshAccessToken/isTokenExpired';

// const setAuthHeader = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Extract the access token from the cookies
//     const accessToken = req.cookies.accessToken;

//     // Verify that the access token exists and is not expired
//     if (accessToken && !isTokenExpired(accessToken)) {
//       req.headers['authorization'] = `Bearer ${accessToken}`;
//     }
    
//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export default setAuthHeader;
