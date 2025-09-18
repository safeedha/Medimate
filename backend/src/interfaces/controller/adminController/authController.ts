import { Request, Response, NextFunction } from "express";
import { ILogin } from "../../../domain/useCaseInterface/auth/IAdminLogin";
import { setCookies, clearCookies } from "../../../application/service/setCookies";
import { HttpMessage } from "../../../constant/httpessages";
import { HttpStatus } from "../../../constant/httpStatus";

export class AuthController {
  constructor(private _loginService: ILogin) {}

  async adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this._loginService.login(email, password);

      if (response?.refreshToken) {
        setCookies(res, response.refreshToken);
      }

      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async adminLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      clearCookies(res);
      res.status(HttpStatus.OK).json({ message: HttpMessage.LOGOUT_SUCCESS });
    } catch (error) {
      next(error);
    }
  }
}
