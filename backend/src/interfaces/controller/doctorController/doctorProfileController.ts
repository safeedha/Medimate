import { Request, Response, NextFunction } from 'express';
import { IUpdateDoctorProfile } from '../../../domain/useCaseInterface/doctor/IUpdateDoctorProfile';
import { HttpStatus } from '../../../constant/httpStatus';
import { HttpMessage } from '../../../constant/httpessages';
import { IGetSingleDoctor } from "../../../domain/useCaseInterface/doctor/IGetSingleDoctor";

interface CustomRequest extends Request {
  id: string;
}

export class DoctorProfileController {
  constructor(
    private readonly _doctorProfile: IUpdateDoctorProfile,
    private readonly _getSingleDoctor: IGetSingleDoctor,
  ) {}

  async updateDoctorProfile(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctorId = req.id;
      const {
        firstname,
        lastname,
        experience,
        fee,
        image,
        phone,
        specialisation,
        qualification,
        medicalLicence
      } = req.body;

      const { newExperienceList } = req.query;

      let parsedExperienceList = [];
      if (typeof newExperienceList === 'string') {
        parsedExperienceList = JSON.parse(newExperienceList);
      }

      const result = await this._doctorProfile.updateprofile(
        doctorId,
        firstname,
        lastname,
        experience,
        fee,
        image,
        phone,
        specialisation,
        qualification,
        medicalLicence,
        parsedExperienceList
      );

      res.status(HttpStatus.OK).json({
        message: HttpMessage.PROFILE_UPDATE_SUCCESS,
        doctor: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async fetchSingleDoctor(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const doctor = await this._getSingleDoctor.getsingledoc(id);

      res.status(HttpStatus.OK).json(doctor);
    } catch (error) {
      next(error);
    }
  }
}
