import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  message: string;
}

const slide = keyframes`
  from {
    bottom: -40px;
  }
  to {
    bottom: 40px;
  }
`;

const ToastStyled = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.white};
  padding: 4px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.textMain};
  height: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${slide} .5s forwards;
`;

const Toast = ({ message }: Props) => (
  <ToastStyled>{message}</ToastStyled>
);

export default Toast;
