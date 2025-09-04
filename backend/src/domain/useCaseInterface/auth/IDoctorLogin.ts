
import {DoctorDTO} from '../../../dto/doctor.dto'
export interface IDoctorLogin {
  login(email: string, password: string): Promise<{
    message: string;
    doctor: DoctorDTO;
    accessToken: string;
    refreshToken: string;
  }>;
}