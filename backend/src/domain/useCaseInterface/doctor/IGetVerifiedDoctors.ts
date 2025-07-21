import {DoctorDTO} from '../../../dto/doctor.dto'
export interface IGetVerifiedDoctors {
  getAllVerifiedDoctors(
    page: number,
    limit: number,
    department?: string,
    search?: string,
    experience?:string
  ): Promise<{ total: number; data: DoctorDTO[] }>; 
}