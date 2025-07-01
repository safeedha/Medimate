import { DoctorDTO } from '../../dto/doctor.dto';

export interface DoctorRepository {
  getAllunverified(page:number,limit:number): Promise<{ doctors: DoctorDTO[]; total: number }>;
  getAllverified(page: number, limit: number, department?: string, search?: string): Promise<{ total: number; data: DoctorDTO[] }>;
  changeStatus(id: string): Promise<DoctorDTO[]>;
  verification(id: string, status: "Approved" | "Rejected"): Promise<DoctorDTO[]>;
  profileupdate(firstname: string, lastname: string, experience: number, fee: number, image: string, email: string, phone: string, specialisation: string, qualification: string,medicalLicence:string): Promise<{ message: string }>;
  getSingleDoctor(id: string): Promise<DoctorDTO>;
  getAlldoctor(page: number, limit: number, search: string): Promise<{ doctors: DoctorDTO[]; total: number }>;
  getAllverifiedbysort(search?: string): Promise<{ total: number; data: DoctorDTO[] }> 

}
