import * as loginAPI from 'api/login';
import { getToken, clearToken, storeToken } from 'utils/session-storage';
import { mockAxiosResponse, mockAxiosError } from 'utils/test';
import { push } from 'connected-react-router';

import paths from 'constants/paths';

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

    it('should call multiple reducers', async () => {
      await login(dummyUser)(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({ type: setLoading.type });
      expect(dispatch).toBeCalledWith({ type: loginSuccess.type });
      expect(dispatch).toBeCalledWith(push(paths.list));
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
