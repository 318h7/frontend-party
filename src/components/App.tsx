import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import store from 'store/store';
import paths from 'constants/paths';

function Home() {
  return <h2>Home</h2>;
}

function List() {
  return <h2>List</h2>;
}

const App = () => (
  <Provider store={store}>
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
