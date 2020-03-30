import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'styled-components';


import rootReducer from 'store/root-reducer';
import theme from 'theme';
import ToastContainer from 'components/toast-container';

interface ProviderProps {
  children: ReactNode,
}


const getProviders = (location = '/') => ({ children }: ProviderProps) => {
  const history = createMemoryHistory({ initialEntries: [location] });

  const store = configureStore({
    reducer: rootReducer,
    middleware: [
      thunk,
      routerMiddleware(history),
    ],
    devTools: false,
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer>
          <ConnectedRouter history={history}>
            {children}
          </ConnectedRouter>
        </ToastContainer>
      </ThemeProvider>
    </Provider>
  );
};

const renderWithProviders = (
  ui: ReactElement,
  location?: string,
  options?: any,
): RenderResult => {
  const Providers = getProviders(location);

  return render(ui, { wrapper: Providers, ...options });
};

export default renderWithProviders;
