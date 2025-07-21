import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  id?: string;
}

const secret = process.env.JWT_SECRET || 'secret';

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
 

    if (decoded && typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
      const { id, role } = decoded;

      if (role === 'user' || role === 'doctor') {
        req.id = id;
        next();
      } else if (role === 'admin') {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized role' });
      }
    } else {
      res.status(401).json({ message: 'Invalid token structure' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
