import axios from 'axios'
import adminInstance from './instance';

export const walletInformation=async()=>{
  try{
    const response = await adminInstance.get(`/wallet`);
    console.log(response)
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