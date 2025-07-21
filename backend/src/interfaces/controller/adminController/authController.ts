import { Request, Response, NextFunction } from "express";
import { ILogin } from "../../../domain/useCaseInterface/auth/IAdminLogin";
import {setCookies,clearCookies} from '../../../application/service/setCookies'

export class AuthController {
  constructor(private loginService: ILogin ) {}

  async adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this.loginService.login(email, password);
       setCookies(res,response?.refreshToken!)
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async adminLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      clearCookies(res)
      res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
      next(error);
    }
  }
}
