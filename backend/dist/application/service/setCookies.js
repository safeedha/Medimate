"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookies = exports.setCookies = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000;
const setCookies = (res, token) => {
    res.cookie("refreshtoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: COOKIE_MAX_AGE
    });
};
exports.setCookies = setCookies;
const clearCookies = (res) => {
    res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
};
exports.clearCookies = clearCookies;
