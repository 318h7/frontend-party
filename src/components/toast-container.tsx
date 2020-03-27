import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { AppState } from 'store/root-reducer';
import Toast from 'components/toast';

export const ToastContainerStyled = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  children: any,
}

const ToastContainer = ({ children }: Props) => {
  const {
    message,
  } = useSelector((state: AppState) => state.toast);

  return (
    <>
      {children}
      <ToastContainerStyled>
        {
          message
          && <Toast message={message} />
        }
      </ToastContainerStyled>
    </>
  );
};

export default ToastContainer;
