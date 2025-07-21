import {DoctorDTO} from '../../../dto/doctor.dto'
export interface IGetSingleDoctor {
  getsingledoc(id: string): Promise<any>; // Replace `any` with Doctor if available
}