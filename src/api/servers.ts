import endpoints from 'constants/endpoints';

import axios from './axios';

export interface Server {
  name: string,
  distance: number,
}
export type Servers = Server[];

export const getServers = () => axios.get<Servers>(
  endpoints.servers,
);
