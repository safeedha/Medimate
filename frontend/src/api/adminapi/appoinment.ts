import axios from 'axios';
import adminInstance from './instance';

export const getAllappoinment = async (id: string) => {
  try {
    const response = await adminInstance.get(`/appoinment/doctor/${id}`);
    console.log(response.data)
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

export const getCountforDoc = async () => {
  try {
    const response = await adminInstance.get(`/appoinment/count`);
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

export const gettotalappoinment = async () => {
  try {
    const response = await adminInstance.get(`/appoinment`);
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
    const response = await adminInstance.get('/appoinment/filter', {
      params: {
        status,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
    console.log(response.data);
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
