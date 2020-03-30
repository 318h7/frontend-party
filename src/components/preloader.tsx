import React from 'react';
import styled, { keyframes } from 'styled-components';

import selectors from 'constants/selectors';

const { preloader } = selectors;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.div`
  position: absolute;
  content: url('/svg/loading-icon.svg');
  animation: ${rotate} 2s linear infinite;
`;


const Container = styled.div`
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = () => (
  <Container>
    <Icon data-qa={preloader.preloader} />
  </Container>
);

export default Spinner;
