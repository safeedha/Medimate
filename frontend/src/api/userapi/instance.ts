// import axios from "axios";
// import type {
//   AxiosInstance,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from "axios";

// interface UserResponseData<T = unknown> {
//   data: T;
//   status: number;
// }


// interface UserErrorData {
//   message: string;
//   code?: string;
// }


// const userInstance: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_USER_API,
//   withCredentials: true,
// });


// userInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     // Optional: Attach token if needed
//     // const token = localStorage.getItem("userToken");
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios Request Error:", error.message);
//     } else if (error instanceof Error) {
//       console.error("Request Error:", error.message);
//     } else {
//       console.error("Unknown Request Error:", error);
//     }
//     return Promise.reject(error);
//   }
// );

// userInstance.interceptors.response.use(
//   (response: AxiosResponse<UserResponseData>) => {
//     return response;
//   },
//   (error) => {
//     if (axios.isAxiosError<UserErrorData>(error)) {
//       console.error("User API Error Message:", error.response?.data.message);
//       console.error("Error Status Code:", error.response?.status);
//     } else if (error instanceof Error) {
//       console.error("Unexpected User Error:", error.message);
//     } else {
//       console.error("Unknown User Error:", error);
//     }
//     return Promise.reject(error);
//   }
// );

// export default userInstance;

import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
const userInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
  withCredentials: true,
});



const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = localStorage.getItem('userToken');
  config.headers = config.headers ?? {};
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return Promise.resolve(config);
};
const onRequestError = (error: AxiosError): Promise<AxiosError> => { 
  console.error('Request Error:', error);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<any> => {
  const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
     
      const res = await userInstance.post('/refresh-token', {});

      const {token} = res.data;

      localStorage.setItem('userToken', token);

      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
      }

      return userInstance(originalRequest);
    } catch (refreshError) {
      console.error('Refresh token failed', refreshError);
      localStorage.removeItem('userToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

 const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onRequestError);
  instance.interceptors.response.use(onResponse, onResponseError);
  return instance;
};

setupInterceptors(userInstance)
export default userInstance;