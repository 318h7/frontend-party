import {
  fireToast,
  addToast,
  removeToast,
} from '../toast-slice';


describe('toast thunk', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const dummyMessage = 'unpredictably random text';

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('should fire and remove toast', async () => {
    getState.mockImplementation(() => ({ toast: {} }));
    await fireToast(dummyMessage)(dispatch, getState, undefined);
    jest.runAllTimers();

    expect(dispatch).toBeCalledWith({
      type: addToast.type,
      payload: { message: dummyMessage, timerId: expect.any(Number) },
    });
    expect(dispatch).toBeCalledWith({ type: removeToast.type });
  });

  it('should remove a prior message when fired', async () => {
    getState.mockImplementation(() => ({ toast: { message: 'some other message', timerId: 1 } }));
    await fireToast(dummyMessage)(dispatch, getState, undefined);
    jest.runAllTimers();

    expect(dispatch).toBeCalledWith({ type: removeToast.type });
    expect(dispatch).toBeCalledWith({
      type: addToast.type,
      payload: { message: dummyMessage, timerId: expect.any(Number) },
    });
    expect(dispatch).toBeCalledWith({ type: removeToast.type });
    expect(dispatch).toBeCalledTimes(3);
  });
});
