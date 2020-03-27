import React from 'react';
import {
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';

import paths from 'constants/paths';
import { getToken } from 'utils/session-storage';

const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  const token = getToken();

  const protectedRoute = token
    ? <Route {...rest}>{children}</Route>
    : <Redirect to={paths.home} />;

  return protectedRoute;
};

export default ProtectedRoute;
