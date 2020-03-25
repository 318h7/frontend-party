import auth, { setLoading, loginSuccess, loginFailed } from '../auth-slice';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(auth(undefined, { type: 'any' })).toEqual({ loading: false });
  });

  it('should handle SET_LOADING', () => {
    expect(
      auth(
        undefined,
        { type: setLoading.type },
      ),
    ).toEqual({
      loading: true,
      error: undefined,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      auth(
        undefined,
        {
          type: loginSuccess.type,
          payload: { token: 'secret' },
        },
      ),
    ).toEqual({
      loading: false,
      error: undefined,
    });
  });

  it('should handle LOGIN_FAILED', () => {
    expect(
      auth(
        undefined,
        {
          type: loginFailed.type,
          payload: { message: 'error' },
        },
      ),
    ).toEqual({
      loading: false,
      error: 'error',
    });
  });
});
