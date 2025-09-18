import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../../constant/httpStatus';
import { HttpMessage } from '../../constant/httpessages';
import {Role} from '../../constant/role';

export const refreshTokenController = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshtoken;

    if (!refreshToken) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: HttpMessage.REFRESH_TOKEN_MISSING});
    return 
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
     let newAccessToken
    
        if (typeof decoded !== 'object' ) {
          throw new Error(HttpMessage.INVALID_REFRESH_TOKEN );
        }
       if(decoded.role===Role.DOCTOR||decoded.role===Role.USER)
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
          
    res.status(HttpStatus.OK).json({ token: newAccessToken });
  } catch (error) {
    if(error instanceof Error)
    {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message ||  HttpMessage.REFRESH_TOKEN_FAILED });
    }
     return
  }
};
