import {RegRepository} from "../../../domain/repository/reg-repository";
import {IOtpVerifier} from "../../../domain/useCaseInterface/authRecovery/IOtpVerifier"

export class DoctorOtpVerify implements IOtpVerifier{
  constructor(private regRepository: RegRepository) {}

  async verifyOtp(otp: string, email: string): Promise<{ message: string }> {
    try {
      await this.regRepository.verifydocOtp(otp, email);

      return { message: "OTP verified successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during OTP verification");
    }

  }
}