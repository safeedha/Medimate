import {IRegistrationRepository} from "../../../domain/repository/RegistrationRepository";
import jwt from 'jsonwebtoken'
import { IDoctorLogin } from '../../../domain/useCaseInterface/auth/IDoctorLogin';
import {DoctorDTO} from '../../../dto/doctor.dto'
import {IDoctorRepository} from '../../../domain/repository/DoctorRepository';

export class DoctorLogin implements IDoctorLogin{
 constructor(private _docRepository:IDoctorRepository){}

async login(email: string, password: string): Promise<{message:string, accessToken:string,refreshToken:string, doctor:DoctorDTO}> 
{
  try{
    const doctorloged = await this._docRepository.docLogin(email, password)
    const doctor={
      _id:doctorloged._id,
      firstname: doctorloged.firstname,
      lastname: doctorloged.lastname,
      email: doctorloged.email,
    };
      
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