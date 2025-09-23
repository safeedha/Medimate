"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorAuthController = void 0;
const otpservice_1 = require("../../../application/service/otpservice");
const emailservice_1 = require("../../../application/service/emailservice");
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
const setCookies_1 = require("../../../application/service/setCookies");
class DoctorAuthController {
    constructor(_doctorRegister, _doctorLogin, _doctorReapply, _otpDocCreation, _otpDocVerify, _doctorPasswordReset) {
        this._doctorRegister = _doctorRegister;
        this._doctorLogin = _doctorLogin;
        this._doctorReapply = _doctorReapply;
        this._otpDocCreation = _otpDocCreation;
        this._otpDocVerify = _otpDocVerify;
        this._doctorPasswordReset = _doctorPasswordReset;
    }
    async registerDoctor(req, res, next) {
        try {
            const { firstname, lastname, email, phone, specialisation, experience, password, fee, additionalInfo, profilePicture, medicalLicence } = req.body;
            const result = await this._doctorRegister.signup({
                firstname,
                lastname,
                email,
                phone,
                specialisation,
                experience,
                password,
                fee,
                additionalInfo,
                profilePicture,
                medicalLicence
            });
            res.status(httpStatus_1.HttpStatus.CREATED).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async loginDoctor(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await this._doctorLogin.login(email, password);
            if (result?.refreshToken) {
                (0, setCookies_1.setCookies)(res, result.refreshToken);
            }
            res.status(httpStatus_1.HttpStatus.OK).json({
                message: result.message,
                doctor: result.doctor,
                accessToken: result.accessToken
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logoutDoctor(req, res, next) {
        try {
            (0, setCookies_1.clearCookies)(res);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.LOGOUT_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
    async reapplyDoctor(req, res, next) {
        try {
            const { email, specialisation, experience, fee, medicalLicence } = req.body;
            const result = await this._doctorReapply.docreapply(email, specialisation, experience, fee, medicalLicence);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async sendOtpToDoctor(req, res, next) {
        try {
            const { email } = req.body;
            const otp = (0, otpservice_1.generateOtp)();
            const subject = "OTP Verification";
            await this._otpDocCreation.createOtp(email, otp);
            await (0, emailservice_1.sendMail)(email, otp, subject, undefined);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.OTP_SENT_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyDoctorOtp(req, res, next) {
        try {
            const { email, otp } = req.body;
            const isValid = await this._otpDocVerify.verifyOtp(email, otp);
            if (!isValid) {
                res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.INVALID_OR_EXPIRED_OTP });
                return;
            }
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.OTP_VERIFIED_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
    async resetDoctorPassword(req, res, next) {
        try {
            const { email, password } = req.body;
            const response = await this._doctorPasswordReset.passwordrest(email, password);
            res.status(httpStatus_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorAuthController = DoctorAuthController;
