import { Request, Response, NextFunction } from "express";
import { IDoctorRegister } from "../../../domain/useCaseInterface/auth/IDoctorRegister";
import { IDoctorLogin } from "../../../domain/useCaseInterface/auth/IDoctorLogin";
import { IDoctorReapply } from "../../../domain/useCaseInterface/auth/IDoctorReapply";
import { generateOtp } from "../../../application/service/otpservice";
import { IOtpCreator } from "../../../domain/useCaseInterface/authRecovery/IOtpCreator";
import { IOtpVerifier } from "../../../domain/useCaseInterface/authRecovery/IOtpVerifier";
import { sendMail } from "../../../application/service/emailservice";
import { IPasswordReset } from "../../../domain/useCaseInterface/authRecovery/IPasswordReset";
import { HttpStatus } from "../../../constant/httpStatus";
import { HttpMessage } from "../../../constant/httpessages";
import { setCookies, clearCookies } from "../../../application/service/setCookies";

export class DoctorAuthController {
  constructor(
    private readonly _doctorRegister: IDoctorRegister,
    private readonly _doctorLogin: IDoctorLogin,
    private readonly _doctorReapply: IDoctorReapply,
    private readonly _otpDocCreation: IOtpCreator,
    private readonly _otpDocVerify: IOtpVerifier,
    private readonly _doctorPasswordReset: IPasswordReset
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

      const result = await this._doctorRegister.signup({
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
      const result = await this._doctorLogin.login(email, password);

      if (result?.refreshToken) {
        setCookies(res, result.refreshToken);
      }

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
      clearCookies(res);
      res.status(HttpStatus.OK).json({ message: HttpMessage.LOGOUT_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async reapplyDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, specialisation, experience, fee, medicalLicence } = req.body;
      const result = await this._doctorReapply.docreapply(email, specialisation, experience, fee, medicalLicence);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }

  async sendOtpToDoctor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const otp = generateOtp();
      const subject = "OTP Verification";

      await this._otpDocCreation.createOtp(email, otp);
      await sendMail(email, otp, subject, undefined);

      res.status(HttpStatus.OK).json({ message: HttpMessage.OTP_SENT_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async verifyDoctorOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      const isValid = await this._otpDocVerify.verifyOtp(email, otp);

      if (!isValid) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: HttpMessage.INVALID_OR_EXPIRED_OTP });
        return;
      }

      res.status(HttpStatus.OK).json({ message: HttpMessage.OTP_VERIFIED_SUCCESS });
    } catch (error) {
      next(error);
    }
  }

  async resetDoctorPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this._doctorPasswordReset.passwordrest(email, password);
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}
