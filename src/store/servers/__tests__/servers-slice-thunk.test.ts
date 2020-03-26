import * as serversAPI from 'api/servers';
import { mockAxiosResponse, mockAxiosError } from 'utils/test';

import {
  setLoading, fetchSuccess, fetchFailed, fetchServers,
} from '../servers-slice';

describe('login thunk', () => {
  const loginSpy = jest.spyOn(serversAPI, 'getServers');
  const dispatch = jest.fn();
  const getState = jest.fn();
  const mockServers = [{ name: 'test', distance: 10 }];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('happy path', () => {
    beforeEach(() => {
      loginSpy.mockImplementation(
        () => Promise.resolve(mockAxiosResponse({ servers: mockServers })),
      );
    });

    afterEach(() => {
      loginSpy.mockReset();
    });


    it('should call multiple reducers', async () => {
      await fetchServers()(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({ type: setLoading.type });
      expect(dispatch).toBeCalledWith({
        type: fetchSuccess.type,
        payload: { servers: mockServers },
      });
    });
  });

  describe('sad path', () => {
    it('should store error on failed login', async () => {
      loginSpy.mockImplementation(
        () => Promise.reject(mockAxiosError({ message: 'random error' }, 500)),
      );

      await fetchServers()(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({
        type: fetchFailed.type,
        payload: { message: 'random error' },
      });
    });
  });
});
