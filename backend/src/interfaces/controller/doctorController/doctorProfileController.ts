import { Request, Response, NextFunction } from 'express';
import { IUpdateDoctorProfile } from '../../../domain/useCaseInterface/doctor/IUpdateDoctorProfile';
import { HttpStatus } from '../../../common/httpStatus';
import { Messages } from '../../../common/messages';
import { IGetSingleDoctor } from "../../../domain/useCaseInterface/doctor/IGetSingleDoctor";

interface CustomRequest extends Request {
  id: string;
}

export class DoctorProfileController {
  constructor(
    //private doctorProfile: IUpdateDoctorProfile,
    private getSingleDoctor: IGetSingleDoctor,
  ) {}

  // async updateDoctorProfile(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const doctorId = req.id;
  //     const {
  //       firstname,
  //       lastname,
  //       experience,
  //       fee,
  //       image,
  //       email,
  //       phone,
  //       specialisation,
  //       qualification,
  //       medicalLicence
  //     } = req.body;

  //     const result = await this.doctorProfile.updateprofile(
  //       firstname,
  //       lastname,
  //       experience,
  //       fee,
  //       image,
  //       email,
  //       phone,
  //       specialisation,
  //       qualification,
  //       medicalLicence
  //     );

  //     res.status(HttpStatus.OK).json({
  //       message: Messages.PROFILE_UPDATE_SUCCESS,
  //       doctor: result,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async fetchSingleDoctor(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req;
      const doctor = await this.getSingleDoctor.getsingledoc(id);
      res.status(HttpStatus.OK).json(doctor);
    } catch (error) {
      next(error);
    }
  }
}

