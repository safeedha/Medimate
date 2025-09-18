import axios from 'axios';
import axiosInstance from "../instances";


export const getAllappoinment = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/admin/appoinment/doctor/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const departmentsummary= async () => {
  try {
    const response = await axiosInstance.get(`/admin/department_summary`);
    console.log(response)
    console.log(response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};



export const getCountforDoc = async (status: 'completed' | 'pending' | 'cancelled') => {
  try {
    const response = await axiosInstance.get(`/admin/appoinment/count`, {
      params: { status },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const gettotalappoinment = async () => {
  try {
    const response = await axiosInstance.get(`/admin/appoinment`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const getAppointmentsFiltered = async (
  status: 'completed' | 'cancelled' | 'pending',
  start: Date,
  end: Date
) => {
  try {
    const response = await axiosInstance.get('/admin/appoinment/filter', {
      params: {
        status,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
    console.log("reponse",response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


function handleError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Internal server error';
  }
}
