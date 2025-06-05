import userInstance from "./instance";
import axios from 'axios'

export const getwallet = async () => {
  try {
   const response = await userInstance.get("/wallet")
    console.log(response.data)
    return response.data; 
  } catch (error) {
      if (axios.isAxiosError(error)) {
      console.log(error)
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }
}