import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import store from 'store/store';
import paths from 'constants/paths';
import Home from 'components/home-page';
import CSSReset from 'components/styled/css-reset';
import AppFont from 'components/styled/app-font';
import theme from 'theme';

require('regenerator-runtime/runtime');


function List() {
  return <h2>List</h2>;
}

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AppFont />
      <Router>
        <Switch>
          <Route path={paths.list}>
            <List />
          </Route>
          <Route path={paths.home}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
