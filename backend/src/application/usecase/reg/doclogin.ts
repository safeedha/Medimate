import {RegRepository} from "../../../domain/repository/reg-repository";
import jwt from 'jsonwebtoken'
import { Idoctor } from '../../../domain/entities/doctor';

export class DoctorLogin{
 constructor(private regRepository:RegRepository){}

async login(email: string, password: string): Promise<{message:string, accessToken:string,refreshToken:string, doctor:Idoctor}> 
{
  try{
    const doctor = await this.regRepository.docLogin(email, password)
    const accesstoken=jwt.sign({id:doctor._id},process.env.JWT_SECRET!, { expiresIn: "15m" });
    const refreshtoken=jwt.sign({id:doctor._id}, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" })
   
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