import adminInstance from './instance';
import axios from 'axios';

export const getAllunVerfiedDoctors = async () => {
  try {
    const response = await adminInstance.get("/doctor/unverified");
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}

export const getAllDoctor = async () => {
  try {
    const response = await adminInstance.get("/doctor");
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}


export const changeblockStatus = async (id: string) => {
  try {
    const response = await adminInstance.patch(`/doctor/status/${id}`);
    console.log(response)
    
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const changeStatus= async (id: string,status:"Approved"|"Rejected") => {
  try {
    const response = await adminInstance.patch(`/doctor/verify/${id}`,{status});
    
    
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}


