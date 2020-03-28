import { createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

import { Credentials, login as loginRequest } from 'api/login';
import { clearToken, storeToken } from 'utils/session-storage';
import { AppThunk } from 'store/store';
import paths from 'constants/paths';
import { fireToast } from 'store/toast/toast-slice';

export type AuthState = {
  loading: boolean,
}

const initialState: AuthState = {
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state: AuthState) {
      state.loading = true;
    },
    stopLoading(state: AuthState) {
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
} = authSlice.actions;

export default authSlice.reducer;

export const login = (
  credentials: Credentials,
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data: { token } } = await loginRequest(credentials);
    dispatch(stopLoading());
    storeToken(token);
    dispatch(push(paths.list));
  } catch ({ response: { data } }) {
    dispatch(stopLoading());
    dispatch(fireToast(data.message));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(push(paths.home));
  clearToken();
};
