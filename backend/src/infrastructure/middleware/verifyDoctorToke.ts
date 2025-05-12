import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyDoctorToken = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accesstokendoctor;

  if (!accessToken) {
    res.status(401).json({ message: "No access token" });
    return;
  }

  jwt.verify(accessToken, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err && err.name === "TokenExpiredError") {
      // Access token expired, try refresh
      const refreshToken = req.cookies.refreshtokendoctor;
      if (!refreshToken) {
        res.status(401).json({ message: "No refresh token" });
        return;
      }

      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, (refreshErr: any, refreshDecoded: any) => {
        if (refreshErr) {
          res.status(403).json({ message: "Invalid refresh token" });
          return;
        }

        // Create new access token
        const newAccessToken = jwt.sign(
          { id: refreshDecoded.id },
          process.env.JWT_SECRET!,
          { expiresIn: "15m" }
        );

        // Set new token and continue
        res.cookie("accesstokendoctor", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 15 * 60 * 1000,
        });

        req.body.doctorId = refreshDecoded.id;
        next();
      });

    } else if (err) {
      res.status(401).json({ message: "Invalid access token" });
      return;
    } else {
      // Token is valid
      req.body.doctorId = decoded.id;
      next();
    }
  });
};
