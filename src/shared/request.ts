import axios, { AxiosError, type AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import type { ApiError } from './types';
import jwtService from './utils/jwt.service';
import displayError from './utils/display-error';

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.CONFLICT]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const request = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
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
