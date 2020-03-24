import endpoints from 'constants/endpoints';

import axios from './axios';

const username = process.env.LOGIN;
const password = process.env.PASSWORD;

interface Response {
  token: string,
}

export default () => axios.post<Response>(
  endpoints.login,
  {
    username,
    password,
  },
);
