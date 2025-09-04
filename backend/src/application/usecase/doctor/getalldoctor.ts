
import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';
import {DoctorDTO} from '../../../dto/doctor.dto'
import { IGetAllDoctor } from '../../../domain/useCaseInterface/doctor/IGetAllDoctor';

export class GetAlldoctor implements IGetAllDoctor{

  constructor(private doctorRepository: IDoctorRepository) {}
  async getAlldoctors(page:number,limit:number,search:string): Promise<{doctors:DoctorDTO[],total:number}> {
    try {
      const {doctors,total} = await this.doctorRepository.getAlldoctor(page,limit,search);
       const maped: DoctorDTO[] = doctors.map((doc) => ({
      _id:doc._id,
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
      isBlocked:doc.isBlocked,
      qualification: doc.qualification,
      additionalInfo: doc.additionalInfo,
      profilePicture: doc.profilePicture,
      medicalLicence: doc.medicalLicence,
    }))
      return {doctors:maped,total}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}