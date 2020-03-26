import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from 'store/store';
import theme from 'theme';
import CSSReset from 'components/styled/css-reset';
import AppFont from 'components/styled/app-font';
import ErrorBoundary from 'components/error-boundary';
import Routes from 'components/routes';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AppFont />
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
);

export default App;
