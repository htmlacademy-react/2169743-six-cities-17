import axios, { AxiosError, type AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import jwtService from './utils/jwt.service';
import displayError from './utils/display-error';
import type { ApiError } from './types';

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
  (error: AxiosError<ApiError>) => {
    if (error.response && shouldDisplayError(error.response)) {
      displayError(error.response.data);
    }

    throw error;
  },
);

export default request;
