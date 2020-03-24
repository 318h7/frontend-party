import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { AppState } from './root-reducer';

const store = configureStore({
  reducer: rootReducer,
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
