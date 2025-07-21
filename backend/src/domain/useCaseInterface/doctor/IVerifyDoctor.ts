import {DoctorDTO} from '../../../dto/doctor.dto'
export interface IVerifyDoctor {
  verifyStatus(id: string, status: 'Approved' | 'Rejected', reason?: string): Promise<
   DoctorDTO[]
  >;
}