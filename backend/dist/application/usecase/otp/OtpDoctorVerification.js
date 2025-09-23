"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorOtpVerify = void 0;
class DoctorOtpVerify {
    constructor(_regRepository) {
        this._regRepository = _regRepository;
    }
    async verifyOtp(otp, email) {
        try {
            await this._regRepository.verifydocOtp(otp, email);
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
exports.DoctorOtpVerify = DoctorOtpVerify;
