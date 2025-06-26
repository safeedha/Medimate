import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface UserResponseData<T = unknown> {
  data: T;
  status: number;
}


interface UserErrorData {
  message: string;
  code?: string;
}


const userInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
  withCredentials: true,
});


userInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Optional: Attach token if needed
    // const token = localStorage.getItem("userToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios Request Error:", error.message);
    } else if (error instanceof Error) {
      console.error("Request Error:", error.message);
    } else {
      console.error("Unknown Request Error:", error);
    }
    return Promise.reject(error);
  }
);

userInstance.interceptors.response.use(
  (response: AxiosResponse<UserResponseData>) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError<UserErrorData>(error)) {
      console.error("User API Error Message:", error.response?.data.message);
      console.error("Error Status Code:", error.response?.status);
    } else if (error instanceof Error) {
      console.error("Unexpected User Error:", error.message);
    } else {
      console.error("Unknown User Error:", error);
    }
    return Promise.reject(error);
  }
);

export default userInstance;
