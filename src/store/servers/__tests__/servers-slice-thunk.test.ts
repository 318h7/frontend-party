import * as serversAPI from 'api/servers';
import * as toastSlice from 'store/toast/toast-slice';
import { mockAxiosResponse, mockAxiosError } from 'axios-utils';

import {
  startLoading, fetchSuccess, stopLoading, fetchServers,
} from '../servers-slice';

describe('login thunk', () => {
  const serversSpy = jest.spyOn(serversAPI, 'getServers');
  const dispatch = jest.fn();
  const getState = jest.fn();
  const mockServers = [{ name: 'test', distance: 10 }];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('happy path', () => {
    beforeEach(() => {
      serversSpy.mockImplementation(
        () => Promise.resolve(mockAxiosResponse(mockServers)),
      );
    });

    afterEach(() => {
      serversSpy.mockReset();
    });


    it('should call store servers list', async () => {
      await fetchServers()(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({ type: startLoading.type });
      expect(dispatch).toBeCalledWith({
        type: fetchSuccess.type,
        payload: mockServers,
      });
    });
  });

  describe('sad path', () => {
    it('should fire toast', async () => {
      const toastSpy = jest.spyOn(toastSlice, 'fireToast');
      const error = { message: 'random error' };
      serversSpy.mockImplementation(
        () => Promise.reject(mockAxiosError(error, 500)),
      );

      await fetchServers()(dispatch, getState, undefined);

      expect(dispatch).toBeCalledWith({ type: stopLoading.type });

      expect(toastSpy).toBeCalledWith(error.message);
    });
  });
});
