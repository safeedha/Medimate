import axiosInstance from "../instances";
import axios from 'axios';

export const getAlluser = async (page: number, limit: number, search: string) => {
  try {
    const response = await axiosInstance.get("/admin/user", {
      params: {
        page,
        limit,
        search,
      },
    });
    return { users: response.data.users, total: response.data.total };
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/admin/user/status/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getsingleuser = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/admin/user/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};
