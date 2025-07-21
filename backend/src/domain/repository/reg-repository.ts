 import {Idoctor} from '../entities/doctor'
 import {Iuser} from '../entities/user'
 import {IOtp} from '../entities/otp'
 import {DoctorDTO} from '../../dto/doctor.dto'
 import {UserDTO} from '../../dto/user.dto'
export interface RegRepository {
  docRegister(data: Idoctor): Promise<void>;
  docReaplly(email:string,specialisation:string,experience:number,fee:number,medicalLicence:string):Promise<void>
  docLogin(email: string, password: string): Promise<DoctorDTO>;
  userRegister(data: Iuser): Promise<void>;
  userLogin(email: string, password: string): Promise<UserDTO>;
  craeteOtp(data: IOtp): Promise<void>;
  craetedocOtp(data:IOtp): Promise<void>
  verifyOtp(email: string, otp: string): Promise<void>;
  verifydocOtp(email: string, otp: string):Promise<void>;
  reset(email:string,password:string):Promise<void>
  resetdoctor(email:string,password:string):Promise<void>
  usergoogleLogin(credential:string):Promise<UserDTO>;
}