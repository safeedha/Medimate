import { Request, Response, NextFunction } from 'express';
import { IDoctorRegister } from '../../../domain/useCaseInterface/auth/IDoctorRegister';
import { IDoctorLogin } from '../../../domain/useCaseInterface/auth/IDoctorLogin';
import { IDoctorReapply } from '../../../domain/useCaseInterface/auth/IDoctorReapply';
import { generateOtp } from '../../../application/service/otpservice';
import { IOtpCreator } from '../../../domain/useCaseInterface/authRecovery/IOtpCreator';
import { IOtpVerifier } from '../../../domain/useCaseInterface/authRecovery/IOtpVerifier';
import { sendMail } from '../../../application/service/emailservice';
import { IPasswordReset } from '../../../domain/useCaseInterface/authRecovery/IPasswordReset';
import { HttpStatus } from '../../../common/httpStatus';
import {Messages} from '../../../common/messages';
import {setCookies,clearCookies} from '../../../application/service/setCookies'

export class DoctorAuthController {
  constructor(
    private doctorRegister: IDoctorRegister,
    private doctorLogin: IDoctorLogin,
    private doctorReapply: IDoctorReapply,
    private otpDocCreation: IOtpCreator,
    private otpDocVerify: IOtpVerifier,
    private doctorPasswordReset: IPasswordReset
  ) {}

  async registerDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        firstname,
        lastname,
        email,
        phone,
        specialisation,
        experience,
        password,
        fee,
        additionalInfo,
        profilePicture,
        medicalLicence
      } = req.body;

      const result = await this.doctorRegister.signup({
        firstname,
        lastname,
        email,
        phone,
        specialisation,
        experience,
        password,
        fee,
        additionalInfo,
        profilePicture,
        medicalLicence
      });

      res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  }

  async loginDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.doctorLogin.login(email, password);
       setCookies(res,result.refreshToken)
      res.status(HttpStatus.OK).json({
        message: result.message,
        doctor: result.doctor,
        accessToken: result.accessToken
      });
    } catch (error) {
      next(error);
    }
  }

  async logoutDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      clearCookies(res)
      res.status(HttpStatus.OK).json({ message: Messages.LOGOUT_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async reapplyDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, specialisation, experience, fee, medicalLicence } = req.body;

      const result = await this.doctorReapply.docreapply(email, specialisation, experience, fee, medicalLicence);

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async sendOtpToDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const otp = generateOtp();
      const subject = 'OTP Verification';

      await this.otpDocCreation.createOtp(email, otp);
      await sendMail(email, otp, subject, undefined);

      res.status(HttpStatus.OK).json({ message: Messages.OTP_SENT_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async verifyDoctorOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      const isValid = await this.otpDocVerify.verifyOtp(email, otp);

      if (!isValid) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid or expired OTP' });
        return;
      }

      res.status(HttpStatus.OK).json({ message:  Messages.OTP_VERIFIED_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async resetDoctorPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this.doctorPasswordReset.passwordrest(email, password);

      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

