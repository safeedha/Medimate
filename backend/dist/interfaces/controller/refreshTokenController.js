"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatus_1 = require("../../constant/httpStatus");
const httpessages_1 = require("../../constant/httpessages");
const role_1 = require("../../constant/role");
const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshtoken;
        if (!refreshToken) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: httpessages_1.HttpMessage.REFRESH_TOKEN_MISSING });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        let newAccessToken;
        if (typeof decoded !== 'object') {
            throw new Error(httpessages_1.HttpMessage.INVALID_REFRESH_TOKEN);
        }
        if (decoded.role === role_1.Role.DOCTOR || decoded.role === role_1.Role.USER) {
            newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        }
        else {
            newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.email, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
        }
        res.status(httpStatus_1.HttpStatus.OK).json({ token: newAccessToken });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({ message: error.message || httpessages_1.HttpMessage.REFRESH_TOKEN_FAILED });
        }
        return;
    }
};
exports.refreshTokenController = refreshTokenController;
