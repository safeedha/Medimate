import axiosInstance from "../instances";
import axios from 'axios';

 
export const  creatAppoinment = async (
  doctorId: string,
  slot: string,
  name: string,
  email: string,
  age: number,
  gender: "male" | "female" | "other",
  reason: string,
  amount: number
) => {
  try {
    const response = await axiosInstance.post("/user/createappoinment", {
      doctorId, slot, name, email, age, gender, reason, amount
    });
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const getPage = async (originalId: string, limit: number) => {
  try {
    const response = await axiosInstance.get("/user/page", {
      params: { originalId, limit }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createlockslot = async (slotid: string, doctorid: string) => {
  try {
    const response = await axiosInstance.post("/user/lockslot", { slotid, doctorid });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }
};

export const  getfutureAppoinments = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get('/user/appointments/future', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPastAppointments = async () => {
  try {
    const response = await axiosInstance.get("/user/appointments/past");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }
};

export const  cancelAppoinment = async (appointmentId: string) => {
  try {
    const response = await axiosInstance.patch("/user/appointment", {
      appoinmentid: appointmentId
    });
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};
