import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// import { login } from 'store/auth/auth-slice';
import { AppState } from 'store/root-reducer';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Dummy = () => {
  // const dispatch = useDispatch();
  const {
    // loading,
    error,
  } = useSelector((state: AppState) => state.auth);
  useEffect(() => {
    // dispatch(login({ username: "tesonet", password: "partyanimal!" }))
  }, []);

  return (
    <>
      <Title data-qa="title">
        Hello!
      </Title>
      <div>{error}</div>
    </>
  );
};

export default Dummy;
