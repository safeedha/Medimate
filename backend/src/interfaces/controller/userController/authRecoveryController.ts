import { Request, Response, NextFunction } from 'express';
import { sendMail } from '../../../application/service/emailservice';
import { IOtpCreator } from "../../../domain/useCaseInterface/authRecovery/IOtpCreator";
import { IOtpVerifier } from "../../../domain/useCaseInterface/authRecovery/IOtpVerifier";
import { IPasswordReset } from "../../../domain/useCaseInterface/authRecovery/IPasswordReset";
import { generateOtp } from '../../../application/service/otpservice';
import { HttpStatus } from '../../../common/httpStatus';
import { Messages } from '../../../common/messages';

export class AuthRecoveryController {
  constructor(
    private otpCreation: IOtpCreator,
    private otpVerification: IOtpVerifier,
    private passwordReset: IPasswordReset
  ) {}

  async sendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const otp = generateOtp();
      const subject = 'OTP Verification';
      await this.otpCreation.createOtp(email, otp);
      await sendMail(email, otp, subject, undefined);

      res.status(HttpStatus.OK).json({ message: Messages.OTP_SENT_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      await this.otpVerification.verifyOtp(email, otp);

      res.status(HttpStatus.OK).json({ message: Messages.OTP_VERIFIED_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      await this.passwordReset.passwordrest(email, password);

      res.status(HttpStatus.OK).json({ message: Messages.PASSWORD_RESET_SUCCESS });
    } catch (error) {
      next(error);
    }
  }
}
