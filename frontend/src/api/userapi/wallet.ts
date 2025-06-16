import userInstance from "./instance";
import axios from 'axios'

export const getwallet = async (page:number,limit:number) => {
  try {
   const response = await userInstance.get("/wallet",{params:{page,limit}})
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