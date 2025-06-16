import doctorInstance from "./instance";
import axios from "axios";

export const getAlluser = async (search:string) => {
  try {
    const response = await doctorInstance.get("/user",{params:{search}});
    return response.data.users; 
  } catch (error) {
    console.log(error);
  }
}



export const geteverymessage = async (sender:string) => {
  try {
 
    const response = await doctorInstance.get("/messages",{
      params:{
        sender
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

export const getUnreadCounts=async () => {
  try {

    const response = await doctorInstance.get("/messages/unread-counts");
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
          
          return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }
}
