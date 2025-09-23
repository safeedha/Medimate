"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpCretion = void 0;
class OtpCretion {
    constructor(_regRepository) {
        this._regRepository = _regRepository;
    }
    async createOtp(email, otp) {
        try {
            const otpData = {
                email: email,
                otp: otp,
                createdAt: new Date()
            };
            await this._regRepository.craeteOtp(otpData);
            return { message: "otp created successfully" };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp creation');
        }
    }
}
exports.OtpCretion = OtpCretion;
