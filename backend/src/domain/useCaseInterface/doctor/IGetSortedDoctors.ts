import {DoctorDTO} from '../../../dto/doctor.dto'
export interface IGetSortedDoctors {
  getAllDoctors(search: string): Promise<{data:DoctorDTO[],total:number}>; // Replace `any` with Doctor[] if available
}