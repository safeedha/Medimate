import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const verifyUserAuth = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accessusertoken;
  const refreshToken = req.cookies.refreshusertoken;

  // No access token
  if (!accessToken) {
    if (!refreshToken) {
      res.status(401).json({ message: "No refresh token" });
      return;
    }

    try {
      const refreshDecoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { id: string };

      const newAccessToken = jwt.sign(
        { id: refreshDecoded.id },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );

      res.cookie("accessusertoken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      });

      (req as any).userId = refreshDecoded.id;
      next();
    } catch (refreshErr) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
    return;
  }

  // Try verifying access token
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as { id: string };
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      if (!refreshToken) {
        res.status(401).json({ message: "No refresh token" });
        return;
      }

      try {
        const refreshDecoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET!
        ) as { id: string };

        const newAccessToken = jwt.sign(
          { id: refreshDecoded.id },
          process.env.JWT_SECRET!,
          { expiresIn: "15m" }
        );

        res.cookie("accessusertoken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
        });

        (req as any).userId = refreshDecoded.id;
        next();
      } catch (refreshErr) {
        res.status(403).json({ message: "Invalid refresh token" });
      }
    } else {
      res.status(401).json({ message: "Invalid access token" });
    }
  }
};
