import {DoctorDTO} from '../../../dto/doctor.dto'

export interface IGetUnverified {
  getAllUnverifiedDoctors(page: number, limit: number): Promise<{
    doctors: DoctorDTO[];
    total: number;
  }>;
}