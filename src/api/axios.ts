import axios, { AxiosRequestConfig } from 'axios';

import { getToken } from 'utils/session-storage';

export const addAuthHeaderIfTokenAvailable = (request: AxiosRequestConfig) => {
  const token = getToken();
  const intercepted = request;

  if (token) {
    intercepted.headers.common.Authentication = `Bearer: ${token}`;
  }
  return intercepted;
};

const instance = axios.create({
  baseURL: process.env.API,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(addAuthHeaderIfTokenAvailable);
export default instance;
