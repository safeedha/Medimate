import axiosInstance from "../instances";
import type { Medicine } from '../../Interface/interface'
import axios from "axios";

export const AddReport = async (htmlcontent: string, appoinmentId: string, userId: string,medicine:Medicine[]) => {
  try {
    const response = await axiosInstance.post("/doctor/report", {
      htmlcontent,
      appoinmentId,
      userId,
      medicine
    });
     console.log(response)
    return response.data;
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
