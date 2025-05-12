import {RegRepository} from "../../../doamin/repository/reg-repository";

export class OtpVerify {
  constructor(private regRepository: RegRepository) {}

  async verifyOtp(otp: string, email: string): Promise<{ message: string }> {
    try {
      await this.regRepository.verifyOtp(otp, email);

      return { message: "OTP verified successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during OTP verification");
    }

  }
}