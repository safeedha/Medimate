
import {Idoctor} from '../../domain/entities/doctor'
import {DoctorDTO,IExperience} from '../../dto/doctor.dto'

export interface DoctorRepository {
  getAllunverified(page:number,limit:number): Promise<{ doctors: DoctorDTO[]; total: number }>;
  getAllverified(page: number, limit: number, department?: string, search?: string,experience?:string): Promise<{ total: number; data: DoctorDTO[] }>;
  changeStatus(id: string): Promise<DoctorDTO[]>;
  verification(id: string, status: "Approved" | "Rejected"): Promise<DoctorDTO[]>;
  profileupdate(id:string,firstname: string, lastname: string, experience: number, fee: number, image: string, phone: string, specialisation: string, qualification: string,medicalLicence:string,experiencelist:IExperience[]): Promise<{ message: string}>;
  getSingleDoctor(id: string): Promise<DoctorDTO>;
  getAlldoctor(page: number, limit: number, search: string): Promise<{ doctors: DoctorDTO[]; total: number }>;
  getAllverifiedbysort(search?: string): Promise<{ total: number; data: DoctorDTO[] }> 

}
