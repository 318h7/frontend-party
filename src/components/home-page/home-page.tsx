import React from 'react';
import styled from 'styled-components';

import Layout from 'components/styled/layout';

import LoginForm from './login-form';

const Background = styled.div`
  background-color: #0b0f27;
  background-image: url(/img/testio-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 360px;
  padding: 0px 20px;
`;

const TestioLogo = styled.img`
  content: url(/img/logo-testio-white.png);
  padding-bottom: 80px;
`;

const HomePage = () => (
  <Layout>
    <Background>
      <Body>
        <TestioLogo />
        <LoginForm />
      </Body>
    </Background>
  </Layout>
);

export default HomePage;
