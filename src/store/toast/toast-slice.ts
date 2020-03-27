import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'store/store';

const TOAST_LIFETIME = 5000;

export type ToastState = {
  message?: string,
  timerId?: number;
}

type ToastAction = Required<ToastState>;

const initialState: ToastState = {};

const serversSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(state: ToastState, { payload }: PayloadAction<ToastAction>) {
      state.message = payload.message;
      state.timerId = payload.timerId;
    },
    removeToast(state: ToastState) {
      state.message = undefined;
      state.timerId = undefined;
    },
  },
});

export const {
  addToast,
  removeToast,
} = serversSlice.actions;

export default serversSlice.reducer;

export const fireToast = (toastMessage: string): AppThunk => async (dispatch, getState) => {
  const { timerId, message } = getState().toast;

  if (message) {
    clearTimeout(timerId);
    dispatch(removeToast());

    const timer = setTimeout(() => {
      dispatch(removeToast());
    }, TOAST_LIFETIME);

    dispatch(addToast({ message: toastMessage, timerId: timer }));
  } else {
    const timer = setTimeout(() => {
      dispatch(removeToast());
    }, TOAST_LIFETIME);

    dispatch(addToast({ message: toastMessage, timerId: timer }));
  }
};
