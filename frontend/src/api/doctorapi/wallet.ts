import axios from 'axios'
import doctorInstance from "./instance";

export const walletInformation=async()=>{
  try{
    const response = await doctorInstance .get(`/wallet`);
    console.log(response.data)
     return response.data;
  }
  catch(error)
  {
      if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}