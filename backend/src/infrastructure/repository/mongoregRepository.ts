import { RegRepository } from '../../domain/repository/reg-repository';
import bcrypt from 'bcrypt'
import { Idoctor } from '../../domain/entities/doctor';
import {DoctorDTO} from '../../dto/doctor.dto'
import { Doctor } from '../database/models/docter';
import { Iuser } from '../../domain/entities/user';
import {UserDTO} from '../../dto/user.dto'
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
      console.log(data)
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

  async docLogin(email: string, password: string): Promise<DoctorDTO> {
  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new Error("This email is not registered");
    }

    const isMatch = await bcrypt.compare(password, doctor.password!);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    if (doctor.status === "Rejected") {
      throw new Error("Your account is rejected by admin");
    }

    if (doctor.status === "Pending") {
      throw new Error("Your account is not approved yet, please contact admin");
    }

    if (doctor.googleVerified === false) {
      throw new Error("Your account is not verified");
    }

    if (doctor.isBlocked === true) {
      throw new Error("This account is blocked by admin, please contact admin");
    }

    // Return only the required fields
    return {
      _id:doctor._id,
      firstname: doctor.firstname,
      lastname: doctor.lastname,
      email: doctor.email,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unexpected error occurred during doctor login");
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
      if (existingUser.password) {
        throw new Error('Email is already registered');
      }
      else{
         existingUser.firstname=data.firstname
         existingUser.lastname=data.lastname
         existingUser.phone=data.phone
         existingUser.isBlocked =data.isBlocked
         existingUser.gender=data.gender
         await existingUser.save()
      }
    }
    else{
      const newUser = new User(data);
      await newUser.save()
    }

    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error occurred during user registration');
    }
  }


async usergoogleLogin(credential: string): Promise<UserDTO> {
  try {
    const decoded = jwtDecode<DecodedGoogleToken>(credential);
    let user = await User.findOne({ email: decoded?.email });

    if (!user) {
      user = new User();
      user.googleIds = decoded?.sub;
      user.firstname = decoded.name?.split(" ")[0] || "";
      user.lastname = decoded.name?.split(" ").slice(1).join(" ") || "";
      user.googleVerified = true;
      user.email = decoded.email;
      await user.save();
    } else {
      if (user.isBlocked) {
        throw new Error("This account is blocked");
      }
      user.googleIds = decoded?.sub;
      await user.save();
    }

    const loggedInUser = await User.findOne({ googleIds: decoded?.sub });

    if (!loggedInUser) {
      throw new Error("User creation failed");
    }

    return {
       _id:loggedInUser._id,
      firstname: loggedInUser.firstname,
      lastname: loggedInUser.lastname,
      email: loggedInUser.email,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unexpected error occurred during user login");
  }
}


  async userLogin(email: string, password: string): Promise<UserDTO> {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("This email is not registered");
    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    if (user.isBlocked) {
      throw new Error("This account is blocked");
    }

    if (!user.googleVerified) {
      throw new Error("This account is not verified");
    }

    return {
      _id:user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unexpected error occurred during user login");
  }
}



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


  async docReaplly(email:string,specialisation:string,experience:number,fee:number,medicalLicence:string):Promise<void>
  {
    try{
           const doctor= await Doctor.findOne({ email: email})
           if(!doctor)
           {
            throw new Error("This email not registered")
           }
           if(doctor.status!=='Rejected')
           {
             throw new Error("Only rejected mail can reapply")
           }
           doctor.status='Pending'
           doctor.specialisation=specialisation
           doctor.experience=experience
           doctor.fee=fee
           doctor.medicalLicence=medicalLicence
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




