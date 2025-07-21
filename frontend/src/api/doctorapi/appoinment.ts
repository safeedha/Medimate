import axiosInstance from "../instances";
import axios from 'axios';

type DayOfWeek = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
type Frequency = "WEEKLY" | "DAILY";

export const createRecslot= async (
  startDate: string,
  endDate: string,
  selectedDays: DayOfWeek[],
  startTime: string,
  endTime: string,
  interval: number,
  frequency: Frequency
) => {
  try {
    const response = await axiosInstance.post("/doctor/slot/recurring", {
      startDate, endDate, selectedDays, startTime, endTime, interval, frequency
    });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const editRecslot=async (
  startDate: string,
  endDate: string,
  selectedDays: DayOfWeek[],
  startTime: string,
  endTime: string,
  interval: number,
  frequency: Frequency,
  slotId:string
) => {
  try {
    const response = await axiosInstance.put(`/doctor/slot/recurring/${slotId}`, {
      startDate, endDate, selectedDays, startTime, endTime, interval, frequency
    });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getPage = async (originalId: string, limit: number) => {
  try {
    const response = await axiosInstance.get('/doctor/page', {
      params: { originalId, limit }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
       return error.response?.data?.message || error.message;
    } else {
      throw new Error('Internal server error');
    }
  }
};

export const getOverviewofappoinment = async () => {
  try {
    const response = await axiosInstance.get('/doctor/appoinment/count');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getrecurring = async (id: string, page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(`/doctor/slots/recurring/${id}`, { params: { page, limit } });
    console.log(response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getallappoinment = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get('/doctor/appoinment', { params: { page, limit } });
    console.log(response)
    return response.data.appoi;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const changerecurringslotStatus = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/doctor/slots/recurring/${id}`);
    return response.data.messgae;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const cancelAppoinment = async (id: string, reason: string, userid: string, email: string) => {
  try {
    const response = await axiosInstance.patch(`/doctor/appoinment/${id}/${userid}`, { reason, email });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getSlotedoctor = async (date: Date) => {
  try {
    const response = await axiosInstance.get('/doctor/slots', {
      params: { date }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const editSlot = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/doctor/slots/${id}`);
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const cancelSlot = async (slotid: string) => {
  try {
    const response = await axiosInstance.delete(`/doctor/slots/${slotid}`);
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const completeappoinment = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/doctor/appoinment/${id}`);
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getsingleappoinment = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/doctor/appoinment/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const reshecdule = async (
  canceledslot: string,
  reason: string,
  userid: string,
  email: string,
  newslot: string
) => {
  try {
    const response = await axiosInstance.post(`/doctor/appoinment/reshedule`, {
      canceledslot, reason, userid, email, newslot
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const followup = async (slotId: string, appoinmentId: string) => {
  try {
    const response = await axiosInstance.post(`/doctor/appoinment/followup`, {
      slotId, appoinmentId
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};

export const getAppointmentsFiltered = async (
  status: 'completed' | 'cancelled' | 'pending',
  start: Date,
  end: Date
) => {
  try {
    const response = await axiosInstance.get('/doctor/appoinment/filter', {
      params: {
        status,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
};
