import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan'; // ✅ Import Morgan
import { adminRouter } from '../interfaces/routes/adminRoutes';
import { doctorRouter } from '../interfaces/routes/doctorRoutes';
import { userRouter } from '../interfaces/routes/userRoutes';
import { refreshTokenRouter } from '../interfaces/routes/refreshTokenRouter';

import cookieParser from 'cookie-parser';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setMiddleware();
    dotenv.config();
    this.setRouter();
  }

  private setMiddleware(): void {
    this.app.use(morgan('dev')); 
    this.app.use(cors({
      origin: ['http://localhost:5173','https://medimate-rust.vercel.app','https://www.medi-mate.safeedha.site'],
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setRouter(): void {
    this.app.use('/refresh-token',refreshTokenRouter)
    this.app.use('/admin', adminRouter);
    this.app.use('/doctor', doctorRouter);
    this.app.use('/user', userRouter);
  }
}
