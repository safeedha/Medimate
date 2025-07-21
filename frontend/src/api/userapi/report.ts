import axiosInstance from "../instances";
import axios from 'axios';

export const getReport = async (appId: string) => {
  try {
    const response = await axiosInstance.get(`/user/report/${appId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
      return 'Internal server error';
    }
  }
};
