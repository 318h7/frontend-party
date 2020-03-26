import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import authReducer from 'store/auth/auth-slice';

import history from 'browserHistory';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
