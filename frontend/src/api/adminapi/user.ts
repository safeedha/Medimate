import adminInstance from './instance';
import axios from 'axios';

export const getAlluser = async () => {
  try {
    const response = await adminInstance.get("/user");
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}


export const changeStatus = async (id: string) => {
  try {
    const response = await adminInstance.patch(`/user/status/${id}`);
     return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}
