import endpoints from 'constants/endpoints';

import axios from './axios';

interface Response {
  token: string,
}

export interface Credentials {
  username: string,
  password: string,
}

export const login = (credentials: Credentials) => axios.post<Response>(
  endpoints.login,
  { ...credentials },
);
