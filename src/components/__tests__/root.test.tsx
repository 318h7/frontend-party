import React from 'react';
import { render, waitFor } from '@testing-library/react';

import Root from '../root';

test('loads and displays greeting', async () => {
  const { getByTestId } = render(<Root />);

  const titleNode = await waitFor(() => getByTestId('title'));
  expect(titleNode).toHaveTextContent('Hello!');
});
