import axios from 'axios';
import jwtService from './utils/jwt.service';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: import.meta.env.REQUEST_TIMEOUT as number,
});

request.interceptors.request.use((config) => {
  const token = jwtService.getToken();

  if (token && config.headers) {
    config.headers['X-Token'] = token;
  }

  return config;
});

export default request;
