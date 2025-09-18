import {IRegistrationRepository} from '../../domain/repository/RegistrationRepository';
import bcrypt from 'bcrypt'
import { Doctor } from '../database/models/docter';

import { User } from '../database/models/user';
import { Otp } from '../database/models/otp';
import { IOtp } from '../../domain/entities/Otp';

import { jwtDecode } from "jwt-decode";
import { DecodedGoogleToken} from '../../domain/entities/Googletoken'

export class MongoRegRepository implements IRegistrationRepository {


  async craeteOtp(data:IOtp): Promise<void> {
    try{
      const mail = data.email;
      const user=await User.findOne({email:mail})
      if(!user)
      {
        throw new Error("This email not exist")
      }
      const existOtp = await Otp.findOne({ email: mail });
       if (existOtp) {
             await existOtp.deleteOne();
        }
       const otp = new Otp(data)
       await otp.save()
    }
    catch(error)
    {
      if (error instanceof Error) {
        throw new Error(error.message); 
      }
      throw new Error('Unexpected error occurred during otp creation');
    }
  }




  
  async craetedocOtp(data:IOtp): Promise<void> {
    try{
      const mail = data.email;
      const doctor=await Doctor.findOne({email:mail})
      if(!doctor)
      {
        throw new Error("This email not exist")
      }
      const existOtp = await Otp.findOne({ email: mail });
       if (existOtp) {
         throw new Error('Otp already exists for this email')
        }
       const otp = new Otp(data)
       await otp.save()
    }
    catch(error)
    {
      if (error instanceof Error) {
        throw new Error(error.message); 
      }
      throw new Error('Unexpected error occurred during otp creation');
    }
  }

async verifyOtp(email: string, otp: string): Promise<void> {
  try{
      const mail=email
      const existingOtp = await Otp.findOne({ email: mail });
      console.log(existingOtp)
      if (!existingOtp) {
        throw new Error('this email not registered for otp')
      }
      if (existingOtp.otp !== otp) {
        throw new Error('invalid otp')
      }
      const user=await User.findOne({email:mail})
       if (!user) {
       throw new Error("User not found");
      }
      user.googleVerified=true
      await user.save()
      
  }
  catch(error)
  {
    if (error instanceof Error) {
      throw new Error(error.message); 
    }
    throw new Error('Unexpected error occurred during otp verification');
  }
}



async verifydocOtp(email: string, otp: string): Promise<void> {
  try{
      const mail=email
      const existingOtp = await Otp.findOne({ email: mail });
      if (!existingOtp) {
        throw new Error('this email not registered for otp')
      }
      if (existingOtp.otp !== otp) {
        throw new Error('invalid otp')
      }
      const doctor=await Doctor.findOne({email:mail})
       if (!doctor) {
       throw new Error("User not found");
      }
      doctor.googleVerified=true
      await doctor.save()
      
  }
  catch(error)
  {
    if (error instanceof Error) {
      throw new Error(error.message); 
    }
    throw new Error('Unexpected error occurred during otp verification');
  }
}


async reset(email:string,password:string):Promise<void>{
  try{
      const user = await User.findOne({ email: email});
      if (!user) {
        throw new Error('this email not registered');
      }
      user.password=password
      await user.save()
  }
  catch(error)
  {
     if (error instanceof Error) {
      throw new Error(error.message); 
    }
    throw new Error('Unexpected error occurred during otp verification');
  }

  }

  async resetdoctor(email:string,password:string):Promise<void>{
    try{
      const doctor= await Doctor.findOne({ email: email,googleIds:null });
      if (!doctor) {
        throw new Error('this email not registered');
      }
      doctor.password=password
      await doctor.save()

  }
  catch(error)
  {
     if (error instanceof Error) {
      throw new Error(error.message); 
    }
    throw new Error('Unexpected error occurred during otp verification');
  }
  }


  
}




