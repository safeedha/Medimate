"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorProfileController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class DoctorProfileController {
    constructor(_doctorProfile, _getSingleDoctor) {
        this._doctorProfile = _doctorProfile;
        this._getSingleDoctor = _getSingleDoctor;
    }
    async updateDoctorProfile(req, res, next) {
        try {
            const doctorId = req.id;
            const { firstname, lastname, experience, fee, image, phone, specialisation, qualification, medicalLicence } = req.body;
            const { newExperienceList } = req.query;
            let parsedExperienceList = [];
            if (typeof newExperienceList === 'string') {
                parsedExperienceList = JSON.parse(newExperienceList);
            }
            const result = await this._doctorProfile.updateprofile(doctorId, firstname, lastname, experience, fee, image, phone, specialisation, qualification, medicalLicence, parsedExperienceList);
            res.status(httpStatus_1.HttpStatus.OK).json({
                message: httpessages_1.HttpMessage.PROFILE_UPDATE_SUCCESS,
                doctor: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchSingleDoctor(req, res, next) {
        try {
            const { id } = req;
            const doctor = await this._getSingleDoctor.getsingledoc(id);
            res.status(httpStatus_1.HttpStatus.OK).json(doctor);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorProfileController = DoctorProfileController;
