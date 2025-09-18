import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});


const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = localStorage.getItem('authToken');
  console.log(token+'this is token')
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
      const res = await axiosInstance.post('/refresh-token', {});
      const { token } = res.data;


      localStorage.setItem('authToken', token);

      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
      }

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error('Refresh token failed', refreshError);
      localStorage.removeItem('authToken');
      window.location.href = '/';
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


setupInterceptors(axiosInstance);
export default axiosInstance;
