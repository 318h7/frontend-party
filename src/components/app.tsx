import React from 'react';
import { Provider } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import store from 'store/store';
import paths from 'constants/paths';
import Home from 'components/home-page';
import List from 'components/servers-list';
import CSSReset from 'components/styled/css-reset';
import AppFont from 'components/styled/app-font';
import theme from 'theme';
import history from 'browserHistory';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AppFont />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={paths.list}>
            <List />
          </Route>
          <Route path={paths.home}>
            <Home />
          </Route>
        </Switch>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
