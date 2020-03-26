import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

import { Credentials, login as loginRequest } from 'api/login';
import { clearToken, storeToken } from 'utils/session-storage';
import { AppThunk } from 'store/store';
import paths from 'constants/paths';

export type AuthState = {
  loading: boolean,
  error?: string,
}

interface AuthError {
  message: string,
}

const initialState: AuthState = {
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state: AuthState) {
      state.loading = true;
    },
    loginSuccess(state: AuthState) {
      state.loading = false;
      state.error = undefined;
    },
    loginFailed(state: AuthState, { payload }: PayloadAction<AuthError>) {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  loginFailed,
} = authSlice.actions;

export default authSlice.reducer;

export const login = (
  credentials: Credentials,
): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data: { token } } = await loginRequest(credentials);
    dispatch(loginSuccess());
    storeToken(token);
    dispatch(push(paths.list));
  } catch ({ response: { data } }) {
    dispatch(loginFailed(data));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(push(paths.home));
  clearToken();
};
