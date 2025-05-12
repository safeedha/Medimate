import userInstance from "./instance";
import axios from "axios";
 import type { AppDispatch } from '../../app/store';
 import { setUserDetails } from '../../feature/userslice';


export const register = async (
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  gender: 'male' | 'female' | 'other' ,
) => {
  try {
    console.log(
      firstname,
      lastname,
      email,
      phone,
      password)
    const response = await userInstance.post("/register", {
      firstname,
      lastname,
      email,
      phone,
      password,
      gender
    });
    return response.data.message; 
  } catch (error) {
    console.log(error);
     if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
  }
}

}



export const login = async (email:string,password:string,dispatch: AppDispatch )=> {
  try {
    const response = await userInstance.post("/login", {email,password  });
     dispatch(setUserDetails(response.data.user))
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


export const otpsend = async (email:string) => {
  try {
    const response = await userInstance.post("/sendotp", {email});
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



export const verifyuserotp = async (email:string,otp:string) => {
  try {
    const response = await userInstance.post("/verifyotp", {email,otp});

   
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


export const userpasswordRest=async(email:string,password:string)=>{
  try{
       const response = await userInstance.post("/reset", {email,password});
       
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


export const googleLogin = async(credential:string,dispatch:AppDispatch) => {
 try{
       const response = await userInstance.post("/googlelogin", {credential})
       dispatch(setUserDetails(response.data.user))
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
};





