import React, { lazy, Suspense } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import ProtectedRoute from 'components/protected-route';

import history from 'browserHistory';
import paths from 'constants/paths';

const Home = lazy(() => import('components/home-page'));
const List = lazy(() => import('components/servers-list'));

const grow = keyframes`
  from {
    width: 0px;
  }
  to {
    width: 100%;
  }
`;

const Preloader = styled.div`
  height: 5px;
  background-color: ${({ theme }) => theme.main};
  animation: ${grow} 1s forwards;
`;

const Routes = () => (
  <ConnectedRouter history={history}>
    <Suspense fallback={<Preloader />}>
      <Switch>
        <ProtectedRoute path={paths.list}>
          <List />
        </ProtectedRoute>
        <Route path={paths.home}>
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </ConnectedRouter>
);

export default Routes;
