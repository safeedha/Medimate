import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

interface CustomRequest extends Request {
  id?: string;
}

export const verifyDoctor = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accesstokendoctor;
  const refreshToken = req.cookies.refreshtokendoctor;

  // If no access token
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

      (req as CustomRequest).id = refreshDecoded.id;

      const newAccessToken = jwt.sign(
        { id: refreshDecoded.id },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );

      res.cookie("accesstokendoctor", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      });

      next();
    } catch (refreshErr) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
    return;
  }

  // If access token is present
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET!
    ) as { id: string };

    (req as CustomRequest).id = decoded.id;
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

        (req as CustomRequest).id = refreshDecoded.id;

        const newAccessToken = jwt.sign(
          { id: refreshDecoded.id },
          process.env.JWT_SECRET!,
          { expiresIn: "15m" }
        );

        res.cookie("accesstokendoctor", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
        });

        next();
      } catch (refreshErr) {
        res.status(403).json({ message: "Invalid refresh token" });
      }
    } else {
      res.status(401).json({ message: "Invalid access token" });
    }
  }
};
