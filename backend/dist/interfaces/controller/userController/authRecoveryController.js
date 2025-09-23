"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRecoveryController = void 0;
const emailservice_1 = require("../../../application/service/emailservice");
const otpservice_1 = require("../../../application/service/otpservice");
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class AuthRecoveryController {
    constructor(_otpCreation, _otpVerification, _passwordReset) {
        this._otpCreation = _otpCreation;
        this._otpVerification = _otpVerification;
        this._passwordReset = _passwordReset;
    }
    async sendOtp(req, res, next) {
        try {
            const { email } = req.body;
            const otp = (0, otpservice_1.generateOtp)();
            const subject = 'OTP Verification';
            await this._otpCreation.createOtp(email, otp);
            await (0, emailservice_1.sendMail)(email, otp, subject, undefined);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.OTP_SENT_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyOtp(req, res, next) {
        try {
            const { email, otp } = req.body;
            await this._otpVerification.verifyOtp(email, otp);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.OTP_VERIFIED_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const { email, password } = req.body;
            await this._passwordReset.passwordrest(email, password);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.PASSWORD_RESET_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthRecoveryController = AuthRecoveryController;
