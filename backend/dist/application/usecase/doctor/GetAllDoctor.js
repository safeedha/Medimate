"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAlldoctor = void 0;
class GetAlldoctor {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async getAlldoctors(page, limit, search) {
        try {
            const doctors = await this._baseRepository.findAll(page, limit, search);
            const maped = doctors.map((doc) => ({
                _id: doc._id,
                firstname: doc.firstname,
                lastname: doc.lastname,
                email: doc.email,
                phone: doc.phone,
                specialisation: doc.specialisation && typeof doc.specialisation === 'object'
                    ? {
                        deptname: doc.specialisation.deptname,
                        description: doc.specialisation.description,
                    }
                    : null,
                experience: doc.experience,
                fee: doc.fee,
                isBlocked: doc.isBlocked,
                qualification: doc.qualification,
                additionalInfo: doc.additionalInfo,
                profilePicture: doc.profilePicture,
                medicalLicence: doc.medicalLicence,
            }));
            return { doctors: maped, total: doctors.length };
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
exports.GetAlldoctor = GetAlldoctor;
