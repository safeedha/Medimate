import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export const verifyAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accesstokenadmin;
  const refreshToken = req.cookies.refreshtokenadmin;

  // Case 1: No access token
  if (!accessToken) {
    if (!refreshToken) {
      res.status(401).json({ message: 'No refresh token' });
      return;
    }

    try {
      const refreshDecoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { email: string };

      const newAccessToken = jwt.sign(
        { email: refreshDecoded.email },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      res.cookie('accesstokenadmin', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000,
      });

      (req as any).adminEmail = refreshDecoded.email;
      next();
    } catch (refreshErr) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
    return;
  }

  
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as { email: string };
    (req as any).adminEmail = decoded.email;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError && refreshToken) {
      try {
        const refreshDecoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET!
        ) as { email: string };

        const newAccessToken = jwt.sign(
          { email: refreshDecoded.email },
          process.env.JWT_SECRET!,
          { expiresIn: '15m' }
        );

        res.cookie('accesstokenadmin', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 15 * 60 * 1000,
        });

        (req as any).adminEmail = refreshDecoded.email;
        next();
      } catch (refreshErr) {
        res.status(401).json({ message: 'Invalid refresh token' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized or invalid token' });
    }
  }
};
