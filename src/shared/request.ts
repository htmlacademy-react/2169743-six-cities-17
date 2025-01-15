import axios, { AxiosError, type AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import jwtService from './utils/jwt.service';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

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

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    if (error.response && shouldDisplayError(error.response)) {
      toast.warn(error.response.data.error);
    }

    throw error;
  },
);

export default request;
