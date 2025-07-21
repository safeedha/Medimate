import axiosInstance from "../instances";
import axios from 'axios';

export const geteverymessage = async (sender: string) => {
  try {
    const response = await axiosInstance.get("/user/messages", {
      params: { sender }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }
};

;

export const getUnreadCounts = async () => {
  try {
    const response = await axiosInstance.get("/user/messages/unread-counts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }
};

export const deletMessage= async (id: string, sender: string, receiver: string) => {
  try {
    const response = await axiosInstance.delete(`/user/messages/${id}`, {
      params: { sender, reciever: receiver }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }
};

export const Messagetimeadding = async (receiver: string) => {
  try {
    const response = await axiosInstance.patch(`/user/doctor/${receiver}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }
};
