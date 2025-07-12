import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan'; // ✅ Import Morgan
import { adminRouter } from '../interfaces/routes/admin.routes';
import { doctorRouter } from '../interfaces/routes/doctor.routes';
import { userRouter } from '../interfaces/routes/user.routes';
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
    this.app.use('/admin', adminRouter);
    this.app.use('/doctor', doctorRouter);
    this.app.use('/user', userRouter);
  }
}
