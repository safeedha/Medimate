



import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000;

export const setCookies = (res: Response, token: string): void => {
  res.cookie("refreshtoken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge:COOKIE_MAX_AGE
  });
};

export const clearCookies=(res: Response):void=>{
   res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

}
