import {RegRepository} from "../../../domain/repository/reg-repository";
import jwt from 'jsonwebtoken'
import { Idoctor } from '../../../domain/entities/doctor';
import { IDoctorLogin } from '../../../domain/useCaseInterface/auth/IDoctorLogin';
import {DoctorDTO} from '../../../dto/doctor.dto'

export class DoctorLogin implements IDoctorLogin{
 constructor(private regRepository:RegRepository){}

async login(email: string, password: string): Promise<{message:string, accessToken:string,refreshToken:string, doctor:DoctorDTO}> 
{
  try{
    const doctor = await this.regRepository.docLogin(email, password)
       console.log(doctor)
          const accesstoken = jwt.sign(
        { id: doctor._id, role: 'doctor' },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      const refreshtoken = jwt.sign(
        { id: doctor._id, role: 'doctor' },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
      );
          return {
      message:"doctor login sucessfull",
      accessToken:accesstoken,
      refreshToken:refreshtoken,
      doctor:doctor
    }
    
  }
  catch(error){
    if (error instanceof Error) {
      
      throw new Error(error.message); 
   }
   throw new Error('Unexpected error occurred during doctor login');
  }
}


} 