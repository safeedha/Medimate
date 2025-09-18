
import {IDoctor,IExperience } from '../entities/Doctor'

export interface IDoctorRepository {
  getAllunverified(page:number,limit:number): Promise<{ doctors: IDoctor[]; total: number }>;
  getAllverified(page: number, limit: number, department?: string, search?: string,experience?:string): Promise<{ total: number; data: IDoctor[] }>; 
  verification(id: string, status: "Approved" | "Rejected"): Promise<IDoctor[]>;
  getAllverifiedbysort(search?: string): Promise<{ total: number; data: IDoctor[] }> 
  docLogin(email: string, password: string): Promise<IDoctor>
    docReaplly(email:string,specialisation:string,experience:number,fee:number,medicalLicence:string):Promise<void>
}
