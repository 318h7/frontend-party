import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import store from 'store/store';
import paths from 'constants/paths';
import Home from 'components/home-page';
import CSSReset from 'components/css-reset';

function List() {
  return <h2>List</h2>;
}

const App = () => (
  <Provider store={store}>
    <CSSReset />
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
  </Provider>
);

export default App;
