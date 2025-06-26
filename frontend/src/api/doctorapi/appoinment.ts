import doctorInstance from "./instance";
import axios from 'axios';

type DayOfWeek = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
type Frequency = "WEEKLY" | "DAILY";

export const createAppoinment = async (
  startDate: string,
  endDate: string,
  selectedDays: DayOfWeek[],
  startTime: string,
  endTime: string,
  interval: number,
  frequency: Frequency
) => {
  try {
    const response = await doctorInstance.post("/slot/recurring", {
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
    const response = await doctorInstance.get('/page', {
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
    const response = await doctorInstance.get('/appoinment/count');
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
    const response = await doctorInstance.get(`/slots/recurring/${id}`, { params: { page, limit } });
    return response.data.result;
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
    const response = await doctorInstance.get('/appoinment', { params: { page, limit } });
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
    const response = await doctorInstance.delete(`/slots/recurring/${id}`);
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
    const response = await doctorInstance.patch(`/appoinment/${id}/${userid}`, { reason, email });
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
    const response = await doctorInstance.get('/slots', {
      params: { date }
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

export const editSlot = async (id: string) => {
  try {
    const response = await doctorInstance.put(`/slots/${id}`);
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
    const response = await doctorInstance.delete(`/slots/${slotid}`);
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
    const response = await doctorInstance.patch(`/appoinment/${id}`);
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
    const response = await doctorInstance.get(`/appoinment/${id}`);
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
    const response = await doctorInstance.post(`/appoinment/reshedule`, {
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
    const response = await doctorInstance.post(`/appoinment/followup`, {
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
    const response = await doctorInstance.get('/appoinment/filter', {
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
