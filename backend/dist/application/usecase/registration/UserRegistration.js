"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRegistration {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async signup(data) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt_1.default.hash(data.password, saltRounds);
            const newdata = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                isBlocked: false,
                googleVerified: false,
                gender: data.gender,
            };
            await this._baseRepository.create(newdata);
            return { message: "User registered successfully" };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Unexpected error occurred during user registration");
        }
    }
}
exports.UserRegistration = UserRegistration;
