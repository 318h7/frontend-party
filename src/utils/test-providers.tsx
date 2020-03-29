import React, { ReactElement, ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import store from 'store/store';

import ToastContainer from 'components/toast-container';

interface ProviderProps {
  children: ReactNode,
}

const Providers = ({ children }: ProviderProps) => {
  const history = createBrowserHistory();

  return (

    <Router history={history}>
      <Provider store={store}>
        <ToastContainer>
          {children}
        </ToastContainer>
      </Provider>
    </Router>
  );
};


export default (
  ui: ReactElement,
  options?: any,
): RenderResult => render(ui, { wrapper: Providers, ...options });
