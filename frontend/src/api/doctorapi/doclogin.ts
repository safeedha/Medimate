import axiosInstance from "../instances";
import axios from "axios";
import{setDoctorDetails}  from '../../feature/doctorslice';
import type { AppDispatch } from '../../app/store';


export const signup = async (
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  specialisation: string,
  experience: number,
  password: string,
  fee: number,
  additionalInfo?: string,
  profilePicture?: string,
  medicalLicence?: string
) => {
  try {
    const response = await axiosInstance.post("/doctor/signup", {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const login = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/doctor/login", { email, password });
    dispatch(setDoctorDetails(response.data.doctor));
    localStorage.setItem('authToken', response.data.accessToken);
   
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getdetails = async () => {
  try {
    const response = await axiosInstance.get('/doctor/status');
    return response.data.staus;
  } catch (error) {
    if (axios.isAxiosError(error)) {
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
    await axiosInstance.get("/doctor/logout");
    localStorage.removeItem('doctorToken');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const docpasswordRest = async (email: string, password: string) => {
  try {
    await axiosInstance.post("/doctor/reset", { email, password });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const verifydoctorotp = async (email: string, otp: string) => {
  try {
    const response = await axiosInstance.post("/doctor/verifyotp", { email, otp });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getSingledoctor=async()=>{
  try{
     const response = await axiosInstance.get("/doctor/");
     return response.data
     console.log(response.data)
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

export const profileUpdate = async (
  data: {
    firstname: string,
    lastname: string,
    experience: number,
    fee: number,
    image: string,
    email: string | undefined,
    phone: string,
    specialisation: string,
    qualification: string,
    medicalLicence: string
  },
  dispatch: AppDispatch
) => {
  try {
    const response = await axiosInstance.post("/doctor/update", data);
    dispatch(setDoctorDetails(response.data.doctor));
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const reappliction = async (
  email: string,
  specialisation: string,
  experience: number,
  fee: number,
  medicalLicence: string
) => {
  try {
    const response = await axiosInstance.put("/doctor/reapply", {
      email,
      specialisation,
      experience,
      fee,
      medicalLicence
    });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const otpsendfordoctor = async (email: string) => {
  try {
    const response = await axiosInstance.post("/doctor/sendotp", { email });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};