import axiosInstance from "../instances";
import axios from 'axios';

export const getwallet = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get("/user/wallet", { params: { page, limit } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
      return 'Internal server error';
    }
  }
};

export const debitwallet= async (amount:number) => {
  try {
    const response = await axiosInstance.post("/user/wallet",{amount});
   
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
      return 'Internal server error';
    }
  }
};
