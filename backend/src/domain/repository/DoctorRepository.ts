
import {Idoctor,IExperience } from '../entities/Doctor'
// import {DoctorDTO,IExperience} from '../../dto/doctor.dto'

export interface IDoctorRepository {
  getAllunverified(page:number,limit:number): Promise<{ doctors: Idoctor[]; total: number }>;
  getAllverified(page: number, limit: number, department?: string, search?: string,experience?:string): Promise<{ total: number; data: Idoctor[] }>;
  changeStatus(id: string): Promise<string>;
  verification(id: string, status: "Approved" | "Rejected"): Promise<Idoctor[]>;
  profileupdate(id:string,firstname: string, lastname: string, experience: number, fee: number, image: string, phone: string, specialisation: string, qualification: string,medicalLicence:string,experiencelist:IExperience[]): Promise<{ message: string}>;
  getSingleDoctor(id: string): Promise<Idoctor>;
  getAlldoctor(page: number, limit: number, search: string): Promise<{ doctors: Idoctor[]; total: number }>;
  getAllverifiedbysort(search?: string): Promise<{ total: number; data: Idoctor[] }> 

}
