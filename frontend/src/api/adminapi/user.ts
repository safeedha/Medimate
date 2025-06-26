import adminInstance from './instance';
import axios from 'axios';

export const getAlluser = async (page: number, limit: number, search: string) => {
  try {
    const response = await adminInstance.get("/user", {
      params: {
        page,
        limit,
        search,
      },
    });
    console.log(response);
    return { users: response.data.users, total: response.data.total };
  } catch (error) {
    console.log(error);
  }
};


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


export const getsingleuser = async (id: string) => {
  try {
    const response = await adminInstance.patch(`/user/${id}`);
     return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

