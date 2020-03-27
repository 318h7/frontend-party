import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import authReducer from 'store/auth/auth-slice';
import serversReducer from 'store/servers/servers-slice';
import toastReducer from 'store/toast/toast-slice';

import history from 'browserHistory';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  servers: serversReducer,
  toast: toastReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
