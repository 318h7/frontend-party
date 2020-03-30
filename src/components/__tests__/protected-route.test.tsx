import React from 'react';
import render from 'test-utils';
import {
  Switch,
  Route,
} from 'react-router-dom';

import { storeToken, clearToken } from 'utils/session-storage';

import ProtectedRoute from '../protected-route';

describe('<ProtectedRoute/>', () => {
  const info = 'public info';
  const secret = 'secret content';
  const TestRoutes = () => (
    <Switch>
      <ProtectedRoute path="/path">
        <div>{secret}</div>
      </ProtectedRoute>
      <Route path="/">
        <div>{info}</div>
      </Route>
    </Switch>
  );

  it('shows protected page when token is present', async () => {
    storeToken('fake');

    const { getByText } = render(
      <TestRoutes />,
      '/path',
    );

    expect(getByText(secret)).toBeInTheDocument();
  });

  it('redirects to home when token is not present', async () => {
    clearToken();

    const { getByText } = render(
      <TestRoutes />,
      '/path',
    );

    expect(getByText(info)).toBeInTheDocument();
  });
});
