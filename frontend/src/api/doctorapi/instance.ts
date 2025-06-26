import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface AdminResponseData<T = unknown> {
  data: T;
  status: number;
}

interface AdminErrorData {
  message: string;
  code?: string;
}

// ✅ Axios instance for doctor
const doctorInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DOCTOR_API,
  withCredentials: true,
});

// ✅ Request Interceptor
doctorInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log("Doctor request sent");
    // Example: Add auth token
    // const token = localStorage.getItem("doctorToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios Request Error:", error.message);
    } else if (error instanceof Error) {
      console.error("Doctor Request Error:", error.message);
    } else {
      console.error("Unknown Doctor Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
doctorInstance.interceptors.response.use(
  (response: AxiosResponse<AdminResponseData>) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError<AdminErrorData>(error)) {
      console.error("Doctor API Error Message:", error.response?.data.message);
      console.error("Error Status Code:", error.response?.status);
    } else if (error instanceof Error) {
      console.error("Unexpected Doctor Error:", error.message);
    } else {
      console.error("Unknown Doctor Error:", error);
    }
    return Promise.reject(error);
  }
);

export default doctorInstance;
