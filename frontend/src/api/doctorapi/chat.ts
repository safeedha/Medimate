import doctorInstance from "./instance";
import axios from "axios";

export const getAlluser = async () => {
  try {
    const response = await doctorInstance.get("/user");
    console.log(response)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}



export const geteverymessage = async (reciever:string) => {
  try {
    console.log(reciever)
    const response = await doctorInstance.get("/messages",{
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
