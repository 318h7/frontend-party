import endpoints from 'constants/endpoints';

import axios from './axios';

export default () => axios.get(
  endpoints.servers,
);
