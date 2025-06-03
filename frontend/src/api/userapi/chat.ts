import userInstance from "./instance";
import axios from 'axios'

export const geteverymessage = async (reciever:string) => {
  try {
    console.log(reciever)
    const response = await userInstance.get("/messages",{
      params:{
        reciever
      }
    });
    console.log(response.data)
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
          
          return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }
}

export const tokenget=async () => {
  try {
   
    const response = await userInstance.get("/gettoken");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
          
          return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }
}