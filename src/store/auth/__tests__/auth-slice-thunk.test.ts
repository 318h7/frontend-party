import * as loginAPI from 'api/login';
import { getToken, clearToken, storeToken } from 'utils/session-storage';
import { mockAxiosResponse, mockAxiosError } from 'utils/test';

import {
  setLoading, loginSuccess, loginFailed, login, logout,
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

    it('should call two reducers', async () => {
      await login(dummyUser)(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({ type: setLoading.type });
      expect(dispatch).toBeCalledWith({ type: loginSuccess.type });
    });

    it('should persist token', async () => {
      await login(dummyUser)(dispatch, getState, undefined);

      expect(getToken()).toBe('secret_token');
    });
  });

  describe('sad path', () => {
    it('should store error on failed login', async () => {
      loginSpy.mockImplementation(
        () => Promise.reject(mockAxiosError({ message: 'unauthorized' }, 401)),
      );

      await login(dummyUser)(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({
        type: loginFailed.type,
        payload: { message: 'unauthorized' },
      });
    });
  });
});

describe('logout thunk', () => {
  it('should clear local storage on logout', async () => {
    storeToken('random');
    const dispatch = jest.fn();
    const getState = jest.fn();

    await logout()(dispatch, getState, undefined);

    expect(getToken()).toBe(null);
  });
});
