



import { Response } from "express";

export const setCookies = (res: Response, token: string): void => {
  res.cookie("refreshtoken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
};

export const clearCookies=(res: Response):void=>{
   res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

}
