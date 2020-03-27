import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from 'store/store';
import theme from 'theme';
import CSSReset from 'components/styled/css-reset';
import GlobalStyles from 'components/styled/global-styles';
import ErrorBoundary from 'components/error-boundary';
import ToastContainer from 'components/toast-container';
import Routes from 'components/routes';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <GlobalStyles />
      <ErrorBoundary>
        <ToastContainer>
          <Routes />
        </ToastContainer>
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
);

export default App;
