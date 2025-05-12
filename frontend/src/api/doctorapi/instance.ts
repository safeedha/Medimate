import axios from "axios";


import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

interface AdminResponseData {
  data: any; 
  status: number;
}

interface AdminErrorData {
  message: string;
  code?: string;
}

const doctorInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DOCTOR_API,
  withCredentials: true,
});

doctorInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
     console.log("this is request")
    return config;
  },
  (error: unknown) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

doctorInstance.interceptors.response.use(
  (response: AxiosResponse<AdminResponseData>) => {
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError<AdminErrorData>(error)) {
      console.error("API Error Message:", error.response?.data.message);
      console.error("Error Status Code:", error.response?.status);
    } else {
      console.error("Unexpected Error:", error);
    }
    return Promise.reject(error);
  }
);

export default doctorInstance;
