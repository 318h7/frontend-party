import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { WhiteButton } from 'components/styled/button';
import { logout } from 'store/auth/auth-slice';

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  padding: 0px 15px;
`;

const TestioLogo = styled.img`
  content: url(/img/logo-testio-black.png);
`;

const StyledWhiteButton = styled(WhiteButton)`
  width: 100px;
  text-align: right;
  padding-right: 10px;
  background-image: url(/svg/logout-icon.svg);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: 10px 1rem;
`;

const AppBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Bar>
      <TestioLogo />
      <StyledWhiteButton onClick={handleLogout}>
        Logout
      </StyledWhiteButton>
    </Bar>
  );
};

export default AppBar;
