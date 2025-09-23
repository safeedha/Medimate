"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchSingleDoctor = void 0;
class FetchSingleDoctor {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async getsingledoc(id) {
        try {
            const doctor = await this._baseRepository.findById(id);
            if (!doctor) {
                throw new Error("cannot fetch single doctor");
            }
            const doctorDto = {
                _id: doctor._id,
                firstname: doctor.firstname,
                lastname: doctor.lastname,
                email: doctor.email,
                phone: doctor.phone,
                qualification: doctor.qualification,
                medicalLicence: doctor.medicalLicence,
                specialisation: doctor.specialisation && typeof doctor.specialisation === 'object'
                    ? {
                        id: doctor.specialisation._id,
                        deptname: doctor.specialisation.deptname,
                        description: doctor.specialisation.description,
                    }
                    : null,
                fee: doctor.fee,
                experience: doctor.experience,
                profilePicture: doctor.profilePicture,
                isBlocked: doctor.isBlocked,
                experienceDetail: doctor.experienceDetail,
            };
            return doctorDto;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error("Some error");
            }
        }
    }
}
exports.FetchSingleDoctor = FetchSingleDoctor;
