import {DoctorDTO,IExperience} from '../../../dto/doctor.dto'

export interface IUpdateDoctorProfile {
  updateprofile(
    id:string,
    firstname: string,
    lastname: string,
    experience: number,
    fee: number,
    image: string,
    phone: string,
    specialisation: string,
    qualification: string,
    medicalLicence: string,
    newExperienceList:IExperience[]
  ): Promise<{message:string}>; // Replace DoctorDTO with the actual return type
}