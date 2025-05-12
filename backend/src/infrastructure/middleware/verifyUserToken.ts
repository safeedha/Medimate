import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUserAuth = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accessusertoken;
  const refreshToken = req.cookies.refreshusertoken;

  if (!accessToken) {
    res.status(401).json({ message: "No access token" });
    return;
  }

  jwt.verify(accessToken, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err && err.name === "TokenExpiredError") {
      if (!refreshToken) {
        res.status(401).json({ message: "No refresh token" });
        return;
      }

      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, (refreshErr: any, refreshDecoded: any) => {
        if (refreshErr) {
          res.status(403).json({ message: "Invalid refresh token" });
          return;
        }

        const newAccessToken = jwt.sign(
          { id: refreshDecoded.id },
          process.env.JWT_SECRET!,
          { expiresIn: "15m" }
        );

        res.cookie("accessusertoken", newAccessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 15 * 60 * 1000,
        });

        (req as any).userId = refreshDecoded.id;
        next();
      });
    } else if (err) {
      res.status(401).json({ message: "Invalid access token" });
      return;
    } else {
      (req as any).userId = decoded.id;
      next();
    }
  });
};
