import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { login } from 'store/auth/auth-slice';
import { AppState } from 'store/root-reducer';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

interface StateProps {
  isLoading: boolean,
}

interface DispatchProps {
  login: typeof login;
}

type Props = StateProps & DispatchProps;

const Dummy = ({ isLoading }: Props) => {
  useEffect(() => {

  }, []);

  return (
    <Title data-qa="title">
      Hello!
      {isLoading}
    </Title>
  );
};

const selectIsLoading = (state: AppState) => state.auth.loading;

const mapStateToProps = (state: AppState): StateProps => ({
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dummy);
