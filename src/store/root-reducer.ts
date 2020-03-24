import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'store/auth/auth-slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
