import { createSlice } from '@reduxjs/toolkit';

import loginRequest from 'api/login';
import { clearToken, storeToken } from 'utils/session-storage';

export type SliceState = {
  loading: boolean,
  error?: string,
};

const todosSlice = createSlice({
  name: 'auth',
  initialState: { loading: false } as SliceState,
  reducers: {
    login() {
      loginRequest().then(
        ({ data: { token } }) => {
          storeToken(token);
        },
      );
    },
    logout() {
      clearToken();
    },
  },
});

export const { login, logout } = todosSlice.actions;
export default todosSlice.reducer;
