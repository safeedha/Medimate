"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const setCookies_1 = require("../../../application/service/setCookies");
const httpessages_1 = require("../../../constant/httpessages");
const httpStatus_1 = require("../../../constant/httpStatus");
class AuthController {
    constructor(_loginService) {
        this._loginService = _loginService;
    }
    async adminLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const response = await this._loginService.login(email, password);
            if (response?.refreshToken) {
                (0, setCookies_1.setCookies)(res, response.refreshToken);
            }
            res.status(httpStatus_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async adminLogout(req, res, next) {
        try {
            (0, setCookies_1.clearCookies)(res);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.LOGOUT_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
