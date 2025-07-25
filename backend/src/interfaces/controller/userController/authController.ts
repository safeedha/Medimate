import { Request, Response, NextFunction } from 'express';
import { IUserRegister } from "../../../domain/useCaseInterface/auth/IUserRegister";
import { IUserLogin } from "../../../domain/useCaseInterface/auth/IUserLogin";
import { IGoogleAuth } from "../../../domain/useCaseInterface/auth/IGoogleAuth";
import { HttpStatus } from '../../../common/httpStatus';
import { Messages } from '../../../common/messages';
import {setCookies,clearCookies} from '../../../application/service/setCookies'

export class AuthController {
  constructor(
    private userRegister: IUserRegister,
    private userLogin: IUserLogin,
    private googleAuth: IGoogleAuth
  ) {}

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { firstname, lastname, email, phone, password, gender } = req.body;
      await this.userRegister.signup({ firstname, lastname, email, phone, password, gender });

      res.status(HttpStatus.CREATED).json({ message: Messages.REGISTRATION_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this.userLogin.login({ email, password });
       setCookies(res,result.refreshToken)
      res.status(HttpStatus.OK).json({
        message: Messages.LOGIN_SUCCESS,
        user: result.user,
        accessusertoken: result.accessToken
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : Messages.INTERNAL_SERVER_ERROR;
      res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage });
    }
  }

  async googleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { credential } = req.body;

      const result = await this.googleAuth.googleLogin(credential);
        setCookies(res,result.refreshToken)
      res.status(HttpStatus.OK).json({
        message: Messages.LOGIN_SUCCESS,
        user: result.user,
        accessusertoken: result.accessToken
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : Messages.GOOGLE_LOGIN_ERROR;
      res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage });
    }
  }

  async logoutUser(req: Request, res: Response): Promise<void> {
    try {
        clearCookies(res)

      res.status(HttpStatus.OK).json({ message: Messages.LOGOUT_SUCCESS });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : Messages.INTERNAL_SERVER_ERROR;
      res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage });
    }
  }
}
