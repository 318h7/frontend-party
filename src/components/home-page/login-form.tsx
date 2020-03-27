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

interface Validation {
  username: boolean;
  password: boolean;
}

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Validation>({ username: false, password: false });
  const dispatch = useDispatch();

  const { loading } = useSelector((state: AppState) => state.auth);

  const isFieldValid = (value: string) => value.trim() !== '';

  const validate = () => ({
    username: !isFieldValid(username),
    password: !isFieldValid(password),
  });

  const handleSubmit = () => {
    const formErrors = validate();
    if (!formErrors.username && !formErrors.password) {
      dispatch(
        login({ username, password }),
      );
    }
    setErrors(formErrors);
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

  const getPlaceholder = (placeholder: string, isValid?: boolean) => (isValid
    ? placeholder
    : 'Required');

  return (
    <Form onSubmit={preventDefaultSubmit}>
      <UserInput
        autoFocus
        name="username"
        placeholder={getPlaceholder('Username*', errors.username)}
        onChange={handleNameChange}
        value={username}
        disabled={loading}
        error={errors.username}
      />
      <PasswordInput
        name="password"
        type="password"
        placeholder={getPlaceholder('Password*', errors.password)}
        value={password}
        onChange={handlePasswordChange}
        disabled={loading}
        error={errors.password}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        Log In
      </Button>
    </Form>
  );
};


export default LoginForm;
