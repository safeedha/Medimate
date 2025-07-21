import {Idoctor} from '../../../domain/entities/doctor';
export interface IUpdateDoctorProfile {
  updateprofile(
    firstname: string,
    lastname: string,
    experience: number,
    fee: number,
    image: string,
    email: string,
    phone: string,
    specialisation: string,
    qualification: string,
    medicalLicence: string
  ): Promise<{message:string,doctor:Idoctor}>; // Replace DoctorDTO with the actual return type
}