import axios from 'axios'
import axiosInstance from "../instances";

export const walletInformation = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(`/admin/wallet`, { params: { page, limit } });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {

      console.log("this is error",error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const refundInformation = async () => {
  try {
    const response = await axiosInstance.get(`/admin/wallet/refund`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const payoutRequest = async () => {
  try {
    console.log("hey")
    const response = await axiosInstance.get(`/admin/wallet/pay`);
    console.log('data here')
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const payoutPayment = async (transactionId: string, doctorid: string) => {
  try {
    const response = await axiosInstance.post(`/admin/wallet/pay`, { transactionId, doctorid });
    console.log('data here')
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const handleRefundForUser = async (transactionId: string) => {
  try {
    const response = await axiosInstance.post(`/admin/wallet/refund`, { transactionId });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}
