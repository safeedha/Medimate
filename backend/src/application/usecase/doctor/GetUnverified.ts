import { IGetUnverified } from '../../../domain/useCaseInterface/doctor/IGetUnverified';
import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';
import {DoctorDTO} from '../../../dto/doctor.dto'
export class GetUnverified implements IGetUnverified {
  constructor(private doctorRepository: IDoctorRepository) {}
  async getAllUnverifiedDoctors(page:number,limit:number): Promise<{ doctors: DoctorDTO[]; total: number }> {
    try {
      const {doctors,total} = await this.doctorRepository.getAllunverified(page,limit);
      const mappedDoctors: DoctorDTO[] = doctors.map((doc) => {
         return {
        _id: doc._id!.toString(),
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
      return {doctors:mappedDoctors,total}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}