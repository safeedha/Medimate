
import {IExperience} from '../../../dto/doctor.dto'
import { IUpdateDoctorProfile } from '../../../domain/useCaseInterface/doctor/IUpdateDoctorProfile';
import {IDoctor} from '../../../domain/entities/Doctor'
import { IBaseRepository } from '../../../domain/repository/BaseRepository'      
export class Docprofile implements IUpdateDoctorProfile{

  constructor(private _baseRepository: IBaseRepository<IDoctor>) {}
  async updateprofile(id:string,firstname:string,lastname:string,experience:number,fee:number,image:string,phone:string,specialisation:string,qualification:string,medicalLicence:string, newExperienceList:IExperience[]): Promise<{message:string}> {
    try {
            const update = await this._baseRepository.update(id, {
        firstname,
        lastname,
        experience,
        fee,
        profilePicture:image,
        phone,
        specialisation,
        qualification,
        medicalLicence,
         experienceDetail:newExperienceList
      });

      return {message:"hjh"}
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

 
  }
}