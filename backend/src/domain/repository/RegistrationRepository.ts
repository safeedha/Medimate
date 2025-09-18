
 import {IOtp} from '../entities/Otp'

export interface IRegistrationRepository {
  
  craeteOtp(data: IOtp): Promise<void>;
  craetedocOtp(data:IOtp): Promise<void>
  verifyOtp(email: string, otp: string): Promise<void>;
  verifydocOtp(email: string, otp: string):Promise<void>;
  reset(email:string,password:string):Promise<void>
  resetdoctor(email:string,password:string):Promise<void>
  
}