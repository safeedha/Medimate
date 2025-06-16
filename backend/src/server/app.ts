import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan'; // ✅ Import Morgan
import { adminRouter } from '../interfaces/routes/adminroutes';
import { doctorRouter } from '../interfaces/routes/doctorroutes';
import { userRouter } from '../interfaces/routes/userroutes';
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
    this.app.use(morgan('dev')); // ✅ Morgan logs all HTTP requests
    this.app.use(cors({
      origin: ['http://localhost:5173'],
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
