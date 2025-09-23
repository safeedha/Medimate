"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
const setCookies_1 = require("../../../application/service/setCookies");
class AuthController {
    constructor(_userRegister, _userLogin, _googleAuth) {
        this._userRegister = _userRegister;
        this._userLogin = _userLogin;
        this._googleAuth = _googleAuth;
    }
    async registerUser(req, res, next) {
        try {
            const { firstname, lastname, email, phone, password, gender } = req.body;
            await this._userRegister.signup({ firstname, lastname, email, phone, password, gender });
            res.status(httpStatus_1.HttpStatus.CREATED).json({ message: httpessages_1.HttpMessage.REGISTRATION_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this._userLogin.login({ email, password });
            (0, setCookies_1.setCookies)(res, result.refreshToken);
            res.status(httpStatus_1.HttpStatus.OK).json({
                message: httpessages_1.HttpMessage.LOGIN_SUCCESS,
                user: result.user,
                accessusertoken: result.accessToken
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : httpessages_1.HttpMessage.INTERNAL_SERVER_ERROR;
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: errorMessage });
        }
    }
    async googleLogin(req, res) {
        try {
            const { credential } = req.body;
            const result = await this._googleAuth.googleLogin(credential);
            (0, setCookies_1.setCookies)(res, result.refreshToken);
            res.status(httpStatus_1.HttpStatus.OK).json({
                message: httpessages_1.HttpMessage.LOGIN_SUCCESS,
                user: result.user,
                accessusertoken: result.accessToken
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : httpessages_1.HttpMessage.GOOGLE_LOGIN_ERROR;
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: errorMessage });
        }
    }
    async logoutUser(req, res) {
        try {
            (0, setCookies_1.clearCookies)(res);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.LOGOUT_SUCCESS });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : httpessages_1.HttpMessage.INTERNAL_SERVER_ERROR;
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: errorMessage });
        }
    }
}
exports.AuthController = AuthController;
