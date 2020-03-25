import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { PasswordInput, UserInput } from 'components/styled/input';
import Button from 'components/styled/button';
import { login } from 'store/auth/auth-slice';
import { AppState } from 'store/root-reducer';

const Form = styled.form`
  & > * {
    margin-bottom: 20px;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const {
    loading,
    // error,
  } = useSelector((state: AppState) => state.auth);

  const handleSubmit = () => {
    dispatch(
      login({ username, password }),
    );
  };

  const preventDefaultSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Form onSubmit={preventDefaultSubmit}>
      <UserInput
        autoFocus
        name="username"
        placeholder="Username"
        onChange={handleNameChange}
        value={username}
        disabled={loading}
      />
      <PasswordInput
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        disabled={loading}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        Log In
      </Button>
    </Form>
  );
};


export default LoginForm;
