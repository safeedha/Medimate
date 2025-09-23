"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorPasswordRest = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class DoctorPasswordRest {
    constructor(_regRepository) {
        this._regRepository = _regRepository;
    }
    async passwordrest(email, password) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            await this._regRepository.resetdoctor(email, hashedPassword);
            return { message: "Password updated" };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Unexpected error occurred during user registration");
        }
    }
}
exports.DoctorPasswordRest = DoctorPasswordRest;
