export interface IOtpCreator {
  createOtp(email: string, otp: string): Promise<{message:string}>;
}