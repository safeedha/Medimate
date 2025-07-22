import axiosInstance from "../instances";
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
    const response = await axiosInstance.post("/user/register", {
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
    const response = await axiosInstance.post("/user/login", {email,password  });
     dispatch(setUserDetails(response.data.user))
    //  console.log(response.data.accessusertoken)
      localStorage.setItem('authToken', response.data.accessusertoken);
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
    const response = await axiosInstance.post("/user/sendotp", {email});
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



export const verifyuserotp = async (email:string,otp:string) => {
  try {
    const response = await axiosInstance.post("/user/verifyotp", {email,otp});

   
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


export const userpasswordRest = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/user/reset", { email, password });
    console.log(response);
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
};

export const googleLogin = async (credential: string, dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/user/googlelogin", { credential });
    dispatch(setUserDetails(response.data.user));
    localStorage.setItem('userToken', response.data.accessusertoken);
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
};

export const getuserdetail = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response.data.user;
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
};

export const setUserdetail = async (
  firstname: string,
  lastname: string,
  phone: string,
  age: number = 1,
  gender: string
) => {
  try {
    const response = await axiosInstance.post("/user/profile", {
      firstname,
      lastname,
      phone,
      age,
      gender
    });
    console.log(response.data.message)
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
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/user/logout");
    localStorage.removeItem('userToken');
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
};



