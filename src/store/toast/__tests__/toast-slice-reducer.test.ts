import toast, { addToast, removeToast } from '../toast-slice';

describe('toast reducer', () => {
  it('should have initial state', () => {
    expect(toast(undefined, { type: 'any' })).toEqual({});
  });

  it('should handle ADD_TOAST', () => {
    const payload = { message: 'random message', timerId: 42 };
    expect(
      toast(
        undefined,
        {
          type: addToast.type,
          payload,
        },
      ),
    ).toEqual({
      ...payload,
    });
  });

  it('should handle REMOVE_TOAST', () => {
    expect(
      toast(
        undefined,
        { type: removeToast.type },
      ),
    ).toEqual({
      message: undefined,
      toastId: undefined,
    });
  });
});
