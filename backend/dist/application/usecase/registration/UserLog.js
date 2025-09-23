"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserLogin {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async login(data) {
        try {
            const { email, password } = data;
            const userloged = await this._userRepository.userLogin(email, password);
            const user = {
                _id: userloged._id,
                firstname: userloged.firstname,
                lastname: userloged.lastname,
                email: userloged.email,
            };
            const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, role: 'user' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
            return {
                user,
                accessToken,
                refreshToken
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Unexpected error occurred during user login");
        }
    }
}
exports.UserLogin = UserLogin;
