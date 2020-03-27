import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'store/store';

const TOAST_LIFETIME = 5000;

export type ToastState = {
  message?: string,
}

type Message = string;

const initialState: ToastState = {};

const serversSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(state: ToastState, { payload }: PayloadAction<Message>) {
      state.message = payload;
    },
    removeToast(state: ToastState) {
      state.message = undefined;
    },
  },
});

export const {
  addToast,
  removeToast,
} = serversSlice.actions;

export default serversSlice.reducer;

export const fireToast = (message: Message): AppThunk => async (dispatch) => {
  dispatch(addToast(message));
  setTimeout(() => {
    dispatch(removeToast());
  }, TOAST_LIFETIME);
};
