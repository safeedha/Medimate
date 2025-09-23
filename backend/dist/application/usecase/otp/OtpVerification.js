"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpVerify = void 0;
class OtpVerify {
    constructor(_regRepository) {
        this._regRepository = _regRepository;
    }
    async verifyOtp(otp, email) {
        try {
            await this._regRepository.verifyOtp(otp, email);
            return { message: "OTP verified successfully" };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Unexpected error occurred during OTP verification");
        }
    }
}
exports.OtpVerify = OtpVerify;
