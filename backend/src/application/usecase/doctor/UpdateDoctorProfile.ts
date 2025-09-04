import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';
import {IExperience} from '../../../dto/doctor.dto'
import { IUpdateDoctorProfile } from '../../../domain/useCaseInterface/doctor/IUpdateDoctorProfile';

export class Docprofile implements IUpdateDoctorProfile{

  constructor(private docRepository: IDoctorRepository) {}
  async updateprofile(id:string,firstname:string,lastname:string,experience:number,fee:number,image:string,phone:string,specialisation:string,qualification:string,medicalLicence:string, newExperienceList:IExperience[]): Promise<{message:string}> {
    try {
      const update = await this.docRepository.profileupdate(id,firstname,lastname,experience,fee,image,phone,specialisation,qualification,medicalLicence,newExperienceList);

      return update
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}