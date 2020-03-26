import React, { lazy, Suspense } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';

import history from 'browserHistory';
import paths from 'constants/paths';

const Home = lazy(() => import('components/home-page'));
const List = lazy(() => import('components/servers-list'));

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Routes = () => (
  <ConnectedRouter history={history}>
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <Switch>
        <Route path={paths.list}>
          <List />
        </Route>
        <Route path={paths.home}>
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </ConnectedRouter>
);

export default Routes;
