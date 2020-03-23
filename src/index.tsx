import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'components/root';

if (document) {
  ReactDOM.render(
    <Root />,
    document.getElementById('root'),
  );
}
