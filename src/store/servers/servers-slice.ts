import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Server, Servers, getServers } from 'api/servers';
import { AppThunk } from 'store/store';

export type ServersState = {
  loading: boolean,
  error?: string,
  servers: Servers,
  nameAscending?: boolean,
  distanceAscending?: boolean,
}

interface ServersError {
  message: string,
}

const initialState: ServersState = {
  loading: false,
  servers: [],
};

const compareDistanceAscending = (a: Server, b: Server) => a.distance - b.distance;
const compareDistanceDescending = (a: Server, b: Server) => b.distance - a.distance;
const compareNameAscending = (a: Server, b: Server) => a.name.localeCompare(b.name);
const compareNameDescending = (a: Server, b: Server) => b.name.localeCompare(a.name);

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setLoading(state: ServersState) {
      state.loading = true;
    },
    fetchSuccess(state: ServersState, { payload }: PayloadAction<Servers>) {
      state.loading = false;
      state.error = undefined;
      state.servers = payload;
    },
    fetchFailed(state: ServersState, { payload }: PayloadAction<ServersError>) {
      state.loading = false;
      state.error = payload.message;
    },
    toggleNameSorting(state: ServersState) {
      state.nameAscending = state.nameAscending !== undefined
        ? !state.nameAscending
        : true;
      state.servers = state.servers.sort(
        state.nameAscending ? compareNameAscending : compareNameDescending,
      );
    },
    toggleDistanceSorting(state: ServersState) {
      state.distanceAscending = state.distanceAscending !== undefined
        ? !state.distanceAscending
        : true;
      state.servers = state.servers.sort(
        state.distanceAscending ? compareDistanceAscending : compareDistanceDescending,
      );
    },
  },
});

export const {
  setLoading,
  fetchSuccess,
  fetchFailed,
  toggleDistanceSorting,
  toggleNameSorting,
} = serversSlice.actions;

export default serversSlice.reducer;

export const fetchServers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await getServers();
    dispatch(fetchSuccess(data));
  } catch ({ response: { data } }) {
    dispatch(fetchFailed(data));
  }
};

export const toggleName = (): AppThunk => async (dispatch) => {
  dispatch(toggleNameSorting());
};

export const toggleDistance = (): AppThunk => async (dispatch) => {
  dispatch(toggleDistanceSorting());
};
