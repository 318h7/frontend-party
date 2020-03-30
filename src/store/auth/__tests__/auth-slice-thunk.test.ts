import * as loginAPI from 'api/login';
import * as toastSlice from 'store/toast/toast-slice';
import { getToken, clearToken, storeToken } from 'utils/session-storage';
import { mockAxiosResponse, mockAxiosError } from 'axios-utils';
import { push } from 'connected-react-router';

import paths from 'constants/paths';

import {
  startLoading, stopLoading, login, logout,
} from '../auth-slice';

describe('login thunk', () => {
  const loginSpy = jest.spyOn(loginAPI, 'login');
  const dispatch = jest.fn();
  const getState = jest.fn();
  const dummyUser = { username: 'user', password: 'secrer' };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('happy path', () => {
    beforeEach(() => {
      loginSpy.mockImplementation(
        () => Promise.resolve(mockAxiosResponse({ token: 'secret_token' })),
      );
    });

    afterEach(() => {
      loginSpy.mockReset();
    });

    afterAll(() => {
      clearToken();
    });

    it('should redirect to list page', async () => {
      await login(dummyUser)(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({ type: startLoading.type });
      expect(dispatch).toBeCalledWith({ type: stopLoading.type });
      expect(dispatch).toBeCalledWith(push(paths.list));
    });

    it('should persist token', async () => {
      await login(dummyUser)(dispatch, getState, undefined);

      expect(getToken()).toBe('secret_token');
    });
  });

  describe('sad path', () => {
    it('should fire toast', async () => {
      const toastSpy = jest.spyOn(toastSlice, 'fireToast');
      const error = { message: 'unathorized' };
      loginSpy.mockImplementation(
        () => Promise.reject(mockAxiosError(error, 401)),
      );

      await login(dummyUser)(dispatch, getState, undefined);
      expect(dispatch).toBeCalledWith({ type: stopLoading.type });
      expect(toastSpy).toBeCalledWith(error.message);
    });
  });
});

describe('logout thunk', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should clear local storage', async () => {
    storeToken('random');

    await logout()(dispatch, getState, undefined);

    expect(getToken()).toBe(null);
  });

  it('should redirect home', async () => {
    await logout()(dispatch, getState, undefined);

    expect(dispatch).toBeCalledWith(push(paths.home));
  });
});
