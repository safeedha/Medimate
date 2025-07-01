// import axios from "axios";
// import type {
//   AxiosInstance,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from "axios";

// interface AdminResponseData<T = unknown> {
//   data: T;
//   status: number;
// }

// interface AdminErrorData {
//   message: string;
//   code?: string;
// }

// // ✅ Axios instance for doctor
// const doctorInstance: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_DOCTOR_API,
//   withCredentials: true,
// });

// // ✅ Request Interceptor
// doctorInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     console.log("Doctor request sent");
//     // Example: Add auth token
//     // const token = localStorage.getItem("doctorToken");
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error: unknown) => {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios Request Error:", error.message);
//     } else if (error instanceof Error) {
//       console.error("Doctor Request Error:", error.message);
//     } else {
//       console.error("Unknown Doctor Request Error:", error);
//     }
//     return Promise.reject(error);
//   }
// );

// // ✅ Response Interceptor
// doctorInstance.interceptors.response.use(
//   (response: AxiosResponse<AdminResponseData>) => {
//     return response;
//   },
//   (error) => {
//     if (axios.isAxiosError<AdminErrorData>(error)) {
//       console.error("Doctor API Error Message:", error.response?.data.message);
//       console.error("Error Status Code:", error.response?.status);
//     } else if (error instanceof Error) {
//       console.error("Unexpected Doctor Error:", error.message);
//     } else {
//       console.error("Unknown Doctor Error:", error);
//     }
//     return Promise.reject(error);
//   }
// );

// export default doctorInstance;



import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const doctorInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DOCTOR_API,
  withCredentials: true,
});

const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = localStorage.getItem('doctorToken');
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
      const res = await doctorInstance.post('/refresh-token', {});
      const { token } = res.data;

      localStorage.setItem('doctorToken', token);

      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
      }

      return doctorInstance(originalRequest);
    } catch (refreshError) {
      console.error('Refresh token failed', refreshError);
      localStorage.removeItem('doctorToken');
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

setupInterceptors(doctorInstance);
export default doctorInstance;
