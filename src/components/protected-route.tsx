import React from 'react';
import {
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';

import paths from 'constants/paths';
import { getToken } from 'utils/session-storage';

const ProtectedRoute = ({ children, ...routeProps }: RouteProps) => {
  const token = getToken();

  const protectedRoute = token
    ? <Route {...routeProps}>{children}</Route>
    : <Redirect to={paths.home} />;

  return protectedRoute;
};

export default ProtectedRoute;
