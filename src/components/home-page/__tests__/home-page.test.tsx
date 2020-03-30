import React from 'react';
import render from 'test-utils';
import { fireEvent, waitFor } from '@testing-library/react';

import * as loginAPI from 'api/login';
import { mockAxiosError, mockAxiosResponse } from 'axios-utils';
import selectors from 'constants/selectors';

import HomePage from '../home-page';

const loginSpy = jest.spyOn(loginAPI, 'login');

const { homePage, toast, preloader } = selectors;

describe('Home Page', () => {
  beforeEach(() => {
    loginSpy.mockImplementation(
      () => Promise.resolve(mockAxiosResponse({ token: 'secret' })),
    );
  });

  afterEach(() => {
    loginSpy.mockReset();
  });

  it('validates for presence of username and password', async () => {
    const { getByTestId } = render(<HomePage />);

    fireEvent.click(getByTestId(homePage.submit));

    expect(loginSpy).not.toBeCalled();
  });

  it('validates for presence of username', async () => {
    const { getByTestId } = render(<HomePage />);
    const passwordInput = getByTestId(homePage.passwordInput);
    const submit = getByTestId(homePage.submit);

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submit);

    expect(loginSpy).not.toBeCalled();
  });

  it('validates for presence of password', async () => {
    const { getByTestId } = render(<HomePage />);
    const userInput = getByTestId(homePage.userInput);
    const submit = getByTestId(homePage.submit);

    fireEvent.change(userInput, { target: { value: 'user' } });
    fireEvent.click(submit);

    expect(loginSpy).not.toBeCalled();
  });

  it('sends the request when required fields are entered', async () => {
    const { getByTestId } = render(<HomePage />);
    const passwordInput = getByTestId(homePage.passwordInput);
    const userInput = getByTestId(homePage.userInput);
    const submit = getByTestId(homePage.submit);

    fireEvent.change(userInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submit);

    expect(loginSpy).toBeCalled();
  });

  it('displays toast with error message on failed login', async () => {
    const { getByTestId } = render(<HomePage />);
    const passwordInput = getByTestId(homePage.passwordInput);
    const userInput = getByTestId(homePage.userInput);
    const submit = getByTestId(homePage.submit);
    const error = { message: 'unathorized' };
    loginSpy.mockReset();
    loginSpy.mockImplementation(
      () => Promise.reject(mockAxiosError(error, 401)),
    );

    fireEvent.change(userInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submit);

    await waitFor(() => getByTestId(toast.toast));
    expect(getByTestId(toast.toast)).toHaveTextContent(error.message);
  });

  it('renders preloader and disabled the fields while request is pending', async () => {
    jest.useFakeTimers();
    loginSpy.mockReset();
    loginSpy.mockImplementationOnce(
      () => new Promise((resolve) => {
        const wait = setTimeout(() => {
          clearTimeout(wait);
          resolve(mockAxiosResponse({ token: 'secret' }));
        }, 5000);
      }),
    );
    const { getByTestId } = render(<HomePage />);
    const passwordInput = getByTestId(homePage.passwordInput);
    const userInput = getByTestId(homePage.userInput);
    const submit = getByTestId(homePage.submit);

    fireEvent.change(userInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submit);

    expect(getByTestId(preloader.preloader)).toBeInTheDocument();
    expect(getByTestId(homePage.passwordInput)).toHaveAttribute('disabled');
    expect(getByTestId(homePage.userInput)).toHaveAttribute('disabled');
    expect(getByTestId(homePage.submit)).toHaveAttribute('disabled');
    jest.runAllTimers();
  });
});
