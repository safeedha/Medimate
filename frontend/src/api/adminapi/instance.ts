import axios from "axios";

import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
  
} from "axios";

interface AdminResponseData<T = unknown> {
  data: T;
  status: number;
}

interface AdminErrorData {
  message: string;
  code?: string;
}

const adminInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API,
  withCredentials: true,
});


adminInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  
    return config;
  },
  (error: unknown) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);


adminInstance.interceptors.response.use(
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

export default adminInstance;
