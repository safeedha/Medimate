import { IDoctorRepository } from '../../../domain/repository/DoctorRepository';
import { DoctorDTO } from '../../../dto/doctor.dto';
import { IGetSingleDoctor } from "../../../domain/useCaseInterface/doctor/IGetSingleDoctor";

export class FetchSingleDoctor implements IGetSingleDoctor {
  constructor(private doctorRepository: IDoctorRepository) {}

  async getsingledoc(id: string): Promise<DoctorDTO> {
    try {
      const doctor = await this.doctorRepository.getSingleDoctor(id);

      const doctorDto: DoctorDTO = {
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Some error");
      }
    }
  }
}
