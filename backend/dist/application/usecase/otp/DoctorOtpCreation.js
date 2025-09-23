"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpdocCretion = void 0;
class OtpdocCretion {
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
            await this._regRepository.craetedocOtp(otpData);
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
exports.OtpdocCretion = OtpdocCretion;
