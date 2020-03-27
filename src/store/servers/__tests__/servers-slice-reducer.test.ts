import servers, { setLoading, fetchSuccess, fetchFailed } from '../servers-slice';

describe('servers reducer', () => {
  it('should handle initial state', () => {
    expect(servers(undefined, { type: 'any' })).toEqual({ servers: [], loading: false });
  });

  it('should handle SET_LOADING', () => {
    expect(
      servers(
        undefined,
        { type: setLoading.type },
      ),
    ).toEqual({
      servers: [],
      loading: true,
      error: undefined,
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    const mockServers = [{ name: 'test', distance: 10 }];

    expect(
      servers(
        undefined,
        {
          type: fetchSuccess.type,
          payload: { servers: mockServers },
        },
      ),
    ).toEqual({
      loading: false,
      error: undefined,
      servers: mockServers,
    });
  });

  it('should handle FETCH_FAILED', () => {
    expect(
      servers(
        undefined,
        {
          type: fetchFailed.type,
          payload: { message: 'error' },
        },
      ),
    ).toEqual({
      loading: false,
      servers: [],
      error: 'error',
    });
  });
});
