import React from 'react';
import { render, waitFor } from '@testing-library/react';

import App from '../App';

test('loads and displays greeting', async () => {
  const { getByTestId } = render(<App />);

  const titleNode = await waitFor(() => getByTestId('title'));
  expect(titleNode).toHaveTextContent('Hello!');
});
