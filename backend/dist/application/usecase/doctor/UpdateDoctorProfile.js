"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docprofile = void 0;
class Docprofile {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async updateprofile(id, firstname, lastname, experience, fee, image, phone, specialisation, qualification, medicalLicence, newExperienceList) {
        try {
            const update = await this._baseRepository.update(id, {
                firstname,
                lastname,
                experience,
                fee,
                profilePicture: image,
                phone,
                specialisation,
                qualification,
                medicalLicence,
                experienceDetail: newExperienceList
            });
            return { message: "hjh" };
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
exports.Docprofile = Docprofile;
