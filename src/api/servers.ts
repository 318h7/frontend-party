import endpoints from 'constants/endpoints';

import axios from './axios';

export interface Server {
  name: string,
  distance: number,
}
export type Servers = Server[];

interface Response {
  servers: Server[],
}

export const getServers = () => axios.get<Response>(
  endpoints.servers,
);
