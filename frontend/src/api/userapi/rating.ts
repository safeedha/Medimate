import axiosInstance from "../instances";
import axios from "axios";

export const createReview = async (comment: string, rating: number, doctorId: string) => {
  try {
    const response = await axiosInstance.post('/user/review', { comment, rating, doctorId });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
      return 'Internal server error';
    }
  }
};

export const getReview = async (doctorId: string, page: number, limit: number) => {
  try {
    const response = await axiosInstance.get('/user/review', {
      params: {
        doctorId,
        page,
        limit
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
      return 'Internal server error';
    }
  }
};

export const getAverage = async (doctorId: string) => {
  try {
    const response = await axiosInstance.get('/user/review/count', {
      params: { doctorId }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
      return 'Internal server error';
    }
  }
};
