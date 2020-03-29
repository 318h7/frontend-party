import React from 'react';
import renderWithProviders from 'utils/test-providers';
import { fireEvent, waitFor } from '@testing-library/react';


import * as loginAPI from 'api/login';
import { mockAxiosError } from 'utils/test';
import selectors from 'constants/selectors';

import HomePage from '../home-page';

const loginSpy = jest.spyOn(loginAPI, 'login');

const { homePage, toast } = selectors;

const setup = () => {
  const utils = renderWithProviders(<HomePage />);
  const userInput = utils.getByTestId(homePage.userInput);
  const passwordInput = utils.getByTestId(homePage.passwordInput);
  const submit = utils.getByTestId(homePage.submit);

  return {
    userInput,
    passwordInput,
    submit,
    ...utils,
  };
};

describe('Home Page', () => {
  afterEach(() => {
    loginSpy.mockReset();
  });

  it('validates for presence of username and password', async () => {
    const { submit } = setup();
    fireEvent.click(submit);

    expect(loginSpy).not.toBeCalled();
  });

  it('validates for presence of username', async () => {
    const { passwordInput, submit } = setup();
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submit);

    expect(loginSpy).not.toBeCalled();
  });

  it('validates for presence of password', async () => {
    const { userInput, submit } = setup();
    fireEvent.change(userInput, { target: { value: 'user' } });
    fireEvent.click(submit);

    expect(loginSpy).not.toBeCalled();
  });

  it('sends the request when required fields are entered', async () => {
    const { userInput, passwordInput, submit } = setup();
    const error = { message: 'unathorized' };
    loginSpy.mockImplementation(
      () => Promise.reject(mockAxiosError(error, 401)),
    );

    fireEvent.change(userInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submit);

    expect(loginSpy).toBeCalled();
  });

  it('displays toast with error message on failed login', async () => {
    const {
      userInput, passwordInput, submit, getByTestId,
    } = setup();
    const error = { message: 'unathorized' };
    loginSpy.mockImplementation(
      () => Promise.reject(mockAxiosError(error, 401)),
    );

    fireEvent.change(userInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submit);

    await waitFor(() => getByTestId(toast.toast));
    expect(getByTestId(toast.toast)).toHaveTextContent(error.message);
  });
});
