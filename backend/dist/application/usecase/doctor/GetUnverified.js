"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUnverified = void 0;
class GetUnverified {
    constructor(_doctorRepository) {
        this._doctorRepository = _doctorRepository;
    }
    async getAllUnverifiedDoctors(page, limit) {
        try {
            const { doctors, total } = await this._doctorRepository.getAllunverified(page, limit);
            const mappedDoctors = doctors.map((doc) => {
                return {
                    _id: doc._id.toString(),
                    firstname: doc.firstname,
                    lastname: doc.lastname,
                    email: doc.email,
                    phone: doc.phone,
                    specialisation: doc.specialisation ?? null,
                    experience: doc.experience,
                    fee: doc.fee,
                    isBlocked: doc.isBlocked,
                    status: doc.status,
                    qualification: doc.qualification,
                    additionalInfo: doc.additionalInfo,
                    profilePicture: doc.profilePicture,
                    medicalLicence: doc.medicalLicence,
                };
            });
            return { doctors: mappedDoctors, total };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    }
}
exports.GetUnverified = GetUnverified;
