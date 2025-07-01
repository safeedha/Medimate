import doctorInstance from "./instance";
import axios from "axios";
import{setDoctorDetails}  from '../../feature/doctorslice';
import type { AppDispatch } from '../../app/store';
import { adddoctortoken} from '../../feature/tokenslice'

 interface Idoctor{
  _id?:string,
  firstname:string,
  lastname:string,
  email:string,
  password:string,
  phone:string,
  specialisation:string|null,
  experience:number,
  fee:number,
  status:"Approved"|"Rejected"|"Pending",
  isBlocked:boolean,
  googleVerified?:boolean,
  additionalInfo?:string,
  profilePicture?:string,
  medicalLicence?:string

}
export const signup = async(
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  specialisation: string,
  experience: number,
  password:string,
  fee: number,
  additionalInfo?: string,
  profilePicture?:string,
  medicalLicence?:string,
  

) => {
 try{
  console.log(firstname,
    lastname,
    email,
    phone,
    specialisation,
    experience,
    password,
    additionalInfo,
    fee,
    profilePicture,
   medicalLicence)

  
  const response = await doctorInstance.post("/signup", {
    firstname,
    lastname,
    email,
    phone,
    specialisation,
    experience,
    password,
    additionalInfo,
    fee,
    profilePicture,
   medicalLicence
  });
   
  return response.data;
 }
 catch (error) {
  if (axios.isAxiosError(error)) {
    console.log(error)
    console.log(error.response?.data?.message);
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Internal server error';
  }
}
};



export const  login= async (email: string, password: string,dispatch:AppDispatch) => {
  try {
    const response = await doctorInstance.post("/login", { email, password });
    console.log(response.data.doctor)
    dispatch(setDoctorDetails(response.data.doctor))
    localStorage.setItem('doctorToken', response.data.accessToken);
    return response.data.message; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error)
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}

export const getdetails=async()=>{
  try{
         const response = await doctorInstance.get('/status');
         console.log(response.data)
         return response.data.staus
  }
  catch(error)
  {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
  }



export const  logout = async () => {
  try {
    await doctorInstance.get("/logout");
    localStorage.removeItem('doctorToken');
   
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error)
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}




export const docpasswordRest=async(email:string,password:string)=>{
  try{
        await doctorInstance.post("/reset", {email,password});
  }
  catch(error)
  {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }

}



export const verifydoctorotp = async (email:string,otp:string) => {
  try {
    const response = await doctorInstance.post("/verifyotp", {email,otp});

   
    return response.data.message; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}


export const profileUpdate=async(data:{firstname:string,lastname:string,experience:number,fee:number,image:string,email:string| undefined,phone:string,specialisation:string,qualification:string,
medicalLicence:string},updata:Idoctor,dispatch:AppDispatch)=>
{
  try{

       const response = await doctorInstance.post("/update", data);
       dispatch(setDoctorDetails(updata))
       return response.data.message
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}


export const reappliction=async(email:string,specialisation:string,experience:number,fee:number,medicalLicence:string)=>
{
  try{
       console.log(specialisation)
         const response = await doctorInstance.put("/reapply",{email,specialisation,experience,fee,medicalLicence});
         console.log(response)
         return response.data.message
  }
  catch(error)
  {
      if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}



export const otpsendfordoctor = async (email:string) => {
  try {
    const response = await doctorInstance.post("/sendotp", {email});
    console.log(response)
    return response.data.message; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}