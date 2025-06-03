import userInstance from "./instance";
import axios from 'axios'

export const getReport=async(appId:string)=>{
  try{
    const response = await userInstance.get(`/report/${appId}`)
    return response.data
  }
  catch(error)
  {
    if (axios.isAxiosError(error)) {
          
          return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }
}