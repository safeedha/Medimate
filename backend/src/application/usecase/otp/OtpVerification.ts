import {IRegistrationRepository} from "../../../domain/repository/RegistrationRepository";
import {IOtpVerifier} from "../../../domain/useCaseInterface/authRecovery/IOtpVerifier"

export class OtpVerify implements IOtpVerifier {
  constructor(private _regRepository: IRegistrationRepository) {}

  async verifyOtp(otp: string, email: string): Promise<{ message: string }> {
    try {
      await this._regRepository.verifyOtp(otp, email);

      return { message: "OTP verified successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during OTP verification");
    }

  }
}