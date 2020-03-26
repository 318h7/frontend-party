import { configureStore, Action } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import history from 'browserHistory';

import rootReducer, { AppState } from './root-reducer';

const isProduction = process.env.NODE_ENV === 'production';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    thunk,
    routerMiddleware(history),
  ],
  devTools: !isProduction,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root-reducer', () => {
    const newRootReducer = require('./root-reducer').default; // eslint-disable-line global-require
    store.replaceReducer(newRootReducer);
  });
}

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch;
export default store;
