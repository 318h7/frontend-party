import { AxiosResponse, AxiosError } from 'axios';

type MockAxiosResponse = <T extends object>(data: T, status?: number) => AxiosResponse<T>;

export const mockAxiosResponse: MockAxiosResponse = (data, status = 200) => ({
  data,
  status,
  headers: {},
  config: {},
  statusText: 'mock_response',
});


type MockAxiosError = <T extends object>(data: T, status?: number) => AxiosError<T>;

export const mockAxiosError: MockAxiosError = (data, status = 400) => ({
  name: 'error',
  message: 'mock_error',
  isAxiosError: true,
  toJSON: () => ({}),
  config: {},
  response: mockAxiosResponse(data, status),
});
