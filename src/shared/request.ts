import axios, { type AxiosRequestConfig } from 'axios';
import jwtService from './utils/jwt.service';

// TODO: .d.ts
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: import.meta.env.REQUEST_TIMEOUT as number,
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = jwtService.getToken();

  if (token && config.headers) {
    config.headers['x-token'] = token;
  }

  return config;
});

request.interceptors.response.use((config: AxiosRequestConfig) => {
  // TODO: error toast
});

export default request;
