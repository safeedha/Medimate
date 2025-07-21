import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const refreshTokenController = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshtoken;

    if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is missing" });
    return 
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
     let newAccessToken
    
        if (typeof decoded !== 'object' ) {
          throw new Error("Invalid refresh token payload");
        }
       if(decoded.role==='doctor'||decoded.role==='user')
       {
              newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role }, 
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
          );
       }
       else{
                newAccessToken = jwt.sign(
            { id: decoded.email, role: decoded.role },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
          );
       }
          
    res.status(200).json({ token: newAccessToken });
  } catch (error:any) {
     res.status(400).json({ message: error.message || "Refresh token failed" });
     return
  }
};
