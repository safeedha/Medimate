export interface IOtpVerifier {
  verifyOtp(email: string, otp: string): Promise<{ message: string }>;
}