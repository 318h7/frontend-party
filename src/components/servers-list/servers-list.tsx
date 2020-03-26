import React from 'react';

import Layout from 'components/styled/layout';

import AppBar from './app-bar';
import List from './list';

const HomePage = () => (
  <Layout>
    <AppBar />
    <List />
  </Layout>
);

export default HomePage;
