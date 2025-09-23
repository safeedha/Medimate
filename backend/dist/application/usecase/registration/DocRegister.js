"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class DocRegister {
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
                specialisation: data.specialisation,
                experience: data.experience,
                fee: data.fee,
                status: "Pending",
                isBlocked: false,
                additionalInfo: data.additionalInfo,
                profilePicture: data.profilePicture,
                medicalLicence: data.medicalLicence
            };
            await this._baseRepository.create(newdata);
            return { message: "Doctor registered successfully" };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during doctor registration');
        }
    }
}
exports.DocRegister = DocRegister;
