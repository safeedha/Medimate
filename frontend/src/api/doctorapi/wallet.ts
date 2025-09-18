import axios from 'axios';
import axiosInstance from "../instances";

export const walletInformation = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(`/doctor/wallet`, {
      params: { page, limit }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
};
