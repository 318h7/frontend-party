import React, { useEffect } from 'react';
import styled from 'styled-components';

import login from 'api/login';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


const Root = () => {
  useEffect(() => {
    login();
  });

  return (
    <Title data-qa="title">
      Hello!
    </Title>
  );
};

export default Root;
