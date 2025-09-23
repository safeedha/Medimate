"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class DoctorLogin {
    constructor(_docRepository) {
        this._docRepository = _docRepository;
    }
    async login(email, password) {
        try {
            const doctorloged = await this._docRepository.docLogin(email, password);
            const doctor = {
                _id: doctorloged._id,
                firstname: doctorloged.firstname,
                lastname: doctorloged.lastname,
                email: doctorloged.email,
            };
            const accesstoken = jsonwebtoken_1.default.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '15m' });
            const refreshtoken = jsonwebtoken_1.default.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
            return {
                message: "doctor login sucessfull",
                accessToken: accesstoken,
                refreshToken: refreshtoken,
                doctor: doctor
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during doctor login');
        }
    }
}
exports.DoctorLogin = DoctorLogin;
