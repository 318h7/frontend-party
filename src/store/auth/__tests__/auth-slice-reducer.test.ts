import auth, { startLoading, stopLoading } from '../auth-slice';

describe('auth reducer', () => {
  it('should have initial state', () => {
    expect(auth(undefined, { type: 'any' })).toEqual({ loading: false });
  });

  it('should handle START_LOADING', () => {
    expect(
      auth(
        undefined,
        { type: startLoading.type },
      ),
    ).toEqual({
      loading: true,
    });
  });

  it('should handle STOP_LOADING', () => {
    expect(
      auth(
        undefined,
        {
          type: stopLoading.type,
          payload: { token: 'secret' },
        },
      ),
    ).toEqual({
      loading: false,
    });
  });
});
