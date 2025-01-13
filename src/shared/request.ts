import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: import.meta.env.REQUEST_TIMEOUT as number,
});

export default request;
