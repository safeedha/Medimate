"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyDoctor = void 0;
const emailservice_1 = require("../../service/emailservice");
class VerifyDoctor {
    constructor(_baseRepository, _docRepository) {
        this._baseRepository = _baseRepository;
        this._docRepository = _docRepository;
    }
    async verifyStatus(id, status, reason) {
        try {
            if (reason) {
                const doctor = await this._baseRepository.findById(id);
                if (!doctor) {
                    throw new Error("Doctor not found");
                }
                await (0, emailservice_1.sendMail)(doctor.email, undefined, 'Application Rejected', reason);
            }
            const users = await this._docRepository.verification(id, status);
            return users.map((doc) => ({
                _id: doc._id?.toString(),
                firstname: doc.firstname,
                lastname: doc.lastname,
                email: doc.email,
                phone: doc.phone,
                specialisation: doc.specialisation,
                experience: doc.experience,
                fee: doc.fee,
                qualification: doc.qualification,
                additionalInfo: doc.additionalInfo,
                profilePicture: doc.profilePicture,
                medicalLicence: doc.medicalLicence,
            }));
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error verifying doctor:', error.message);
                throw new Error(error.message);
            }
            else {
                console.error('Error verifying doctor:', error);
                throw new Error('An unknown error occurred');
            }
        }
    }
}
exports.VerifyDoctor = VerifyDoctor;
