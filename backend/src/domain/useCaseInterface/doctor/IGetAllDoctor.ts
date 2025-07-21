import { DoctorDTO } from '../../../dto/doctor.dto';

export interface IGetAllDoctor {
  getAlldoctors(page: number, limit: number, search: string): Promise<{
    doctors: DoctorDTO[];
    total: number;
  }>;
}