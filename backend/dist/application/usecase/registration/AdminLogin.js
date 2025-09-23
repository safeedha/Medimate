"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Login {
    constructor() {
    }
    async login(email, password) {
        if (email === "admin@gmail.com" && password === "admin@123") {
            const accessToken = jsonwebtoken_1.default.sign({ email: email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jsonwebtoken_1.default.sign({ email: email, role: 'admin' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
            return {
                message: "admin login sucessfull",
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        }
        else {
            return {
                message: "invalid credential"
            };
        }
    }
}
exports.Login = Login;
