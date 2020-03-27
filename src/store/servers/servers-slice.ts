import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Servers, getServers } from 'api/servers';
import { AppThunk } from 'store/store';

export type ServersState = {
  loading: boolean,
  error?: string,
  servers: Servers,
}

interface ServersError {
  message: string,
}

const initialState: ServersState = {
  loading: false,
  servers: [],
};

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setLoading(state: ServersState) {
      state.loading = true;
    },
    fetchSuccess(state: ServersState, { payload }: PayloadAction<{servers: Servers}>) {
      state.loading = false;
      state.error = undefined;
      state.servers = payload.servers;
    },
    fetchFailed(state: ServersState, { payload }: PayloadAction<ServersError>) {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const {
  setLoading,
  fetchSuccess,
  fetchFailed,
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
