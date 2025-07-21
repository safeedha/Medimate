import axiosInstance from "../instances";
import axios from 'axios';

export const getAllunVerfiedDoctors = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get("/admin/doctor/unverified", {
      params: {
        page,
        limit
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllDoctor = async (page: number, limit: number, search?: string) => {
  try {
    const response = await axiosInstance.get("/admin/doctor", {
      params: {
        page,
        limit,
        search
      },
    });

    return {
      doctors: response.data.doctors,
      total: response.data.total,
    };
  } catch (error) {
    console.log(error);
    return { doctors: [], total: 0 }; // fallback to avoid crashing UI
  }
};

export const changeblockStatus = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/admin/doctor/status/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const changeStatus = async (id: string, status: "Approved" | "Rejected", reason?: string) => {
  try {
    const response = await axiosInstance.patch(`/admin/doctor/verify/${id}`, { status }, {
      params: {
        reason: reason
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const getsingleDoctor = async (doctorid: string) => {
  try {
    const response = await axiosInstance.get(`/admin/doctor/${doctorid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}
