import { RegRepository } from '../../domain/repository/reg-repository';
import { Idoctor } from '../../domain/entities/doctor';
import { Doctor } from '../database/models/docter';
import { Iuser } from '../../domain/entities/user';
import { User } from '../database/models/user';
import { Otp } from '../database/models/otp';
import { IOtp } from '../../domain/entities/otp';
import { jwtDecode } from "jwt-decode";
interface DecodedGoogleToken {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
export class MongoRegRepository implements RegRepository {
  async docRegister(data: Idoctor): Promise<void> {
    try {
      const mail = data.email;
      const phone = data.phone;
      const existingPhone = await Doctor.findOne({ phone: phone });
      if (existingPhone) {
        throw new Error('Doctor with this phone number already exists');
      }
      const existingDoctor = await Doctor.findOne({ email: mail });

      if (existingDoctor) {
        throw new Error('Doctor with this email already exists');
      }

      const newDoctor = new Doctor(data);
      await newDoctor.save();

      
    } catch (error) {
      if (error instanceof Error) {
      
        throw new Error(error.message); // or just: throw error;
      }
    
      throw new Error('Unexpected error occurred during doctor registration');
    }
  }

  async docLogin(email: string, password: string): Promise<Idoctor> {

    {
      try{
        const doctor=await Doctor.findOne({email:email})
        
        if(!doctor)
        {
          throw new Error("This email is not registered")
        }
        if(doctor.password!==password)
        {
          throw new Error("Invalid credential")
        }
        if(doctor.status==="Rejected")
        {
          throw new Error("Your account is Rejected by admin")
        }
        if(doctor.status==="Pending")
        {
          throw new Error("Your account is not approved yet,please contact admin")
        }
        if(doctor.googleVerified===false)
        {
          throw new Error("Your account not verified")
        }
         if(doctor.isBlocked===true)
        {
          throw new Error("This account is blocked by admin,Please contact admin")
        }
        return doctor;
      }
      catch(error)
      {
        if (error instanceof Error) {
          throw new Error(error.message); // or just: throw error;
        }
        throw new Error('Unexpected error occurred during doctor login');
      }
    }
}


  async userRegister(data: Iuser): Promise<void> {
    try {
      const mail = data.email;
      const phone = data.phone;
      const existingPhone = await User.findOne({ phone: phone });
      if (existingPhone) {
        throw new Error('User with this phone number already exists');
      }
      const existingUser = await User.findOne({ email: mail });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      const newUser = new User(data);
      await newUser.save()

    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // or just: throw error;
      }
      throw new Error('Unexpected error occurred during user registration');
    }
  }


  async usergoogleLogin(credential:string):Promise<Iuser>{
    try{
              const decoded = jwtDecode<DecodedGoogleToken>(credential);
              console.log(decoded)
               const existingUser = await User.findOne({  googleIds: decoded?.sub });
               if(!existingUser)
               {
              
                 const user=new User()
                  user.googleIds=decoded?.sub
                  user.firstname=decoded.name
                  user.googleVerified=true
                  user.email=decoded.email
                  await user.save()
               }
              const user = await User.findOne({ googleIds: decoded?.sub });
            if (!user) {
              throw new Error("User creation failed");
            }
            return user;
    }
    catch(error)
    {
       if (error instanceof Error) {
        throw new Error(error.message); // or just: throw error;
      }
      throw new Error('Unexpected error occurred during user login');
    }
  }

  async userLogin(email: string, password: string): Promise<Iuser> {
    try {
      const user = await User.findOne({ email: email,googleIds:null });
      if (!user) {
        throw new Error('this email not registered');
      }
      if (user.password !== password) {
        throw new Error('invalid credential');
      }
      if (user.isBlocked === true) {
        throw new Error('this account is blocked');
      }
      if (user.googleVerified === false) {
        throw new Error('this account is not verified');
      }
      return user;
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // or just: throw error;
      }
      throw new Error('Unexpected error occurred during user login');
    }
  }


  async craeteOtp(data:IOtp): Promise<void> {
    try{
      const mail = data.email;
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
      if (!existingOtp) {
        throw new Error('this email not registered for otp')
      }
      if (existingOtp.otp !== otp) {
        throw new Error('invalid otp')
      }
      const user=await User.findOne({email:mail,googleIds:null})
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
      const user = await User.findOne({ email: email,googleIds:null });
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




