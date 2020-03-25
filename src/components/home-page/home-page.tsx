import React from 'react';
import styled from 'styled-components';

import Layout from 'components/layout';
import TestioLogo from 'components/testio-logo';

const Background = styled.div`
  background-color: #0b0f27;
  background-image: url(/img/tesonet-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Form = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 360px;
`;

const HomePage = () => (
  <Layout>
    <Background>
      <Form>
        <TestioLogo width="100%" height="100%" />
      </Form>
    </Background>
  </Layout>
);

export default HomePage;
