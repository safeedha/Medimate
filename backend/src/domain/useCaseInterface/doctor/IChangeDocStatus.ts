import { DoctorDTO } from '../../../dto/doctor.dto';
export interface IChangeDocStatus {
  changesatus(id: string): Promise<DoctorDTO[]>;
}