import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import render from 'test-utils';
import * as serversAPI from 'api/servers';
import { mockAxiosError, mockAxiosResponse } from 'axios-utils';
import selectors from 'constants/selectors';

import ServersPage from '../servers-page';


const { serversPage, toast, preloader } = selectors;

const serversSpy = jest.spyOn(serversAPI, 'getServers');

describe('Servers Page', () => {
  beforeEach(() => {
    serversSpy.mockImplementationOnce(
      () => Promise.resolve(mockAxiosResponse([])),
    );
  });

  it('fetches servers on load', async () => {
    render(<ServersPage />);

    expect(serversSpy).toBeCalled();
  });

  it('does not render sorting arrows by default', async () => {
    const utils = render(<ServersPage />);
    const headerIcons = utils.queryAllByTestId(serversPage.headerIcon);

    expect(headerIcons).toHaveLength(0);
  });

  it('renders name sorting after name header click', async () => {
    const { getAllByTestId } = render(<ServersPage />);
    const headerItems = getAllByTestId(serversPage.headerItem);

    fireEvent.click(headerItems[0]);

    const headerIcons = getAllByTestId(serversPage.headerIcon);
    expect(headerIcons).toHaveLength(1);
  });

  it('renders distance sorting after distance header click', async () => {
    const { getAllByTestId } = render(<ServersPage />);
    const headerItems = getAllByTestId(serversPage.headerItem);

    fireEvent.click(headerItems[1]);

    const headerIcons = getAllByTestId(serversPage.headerIcon);
    expect(headerIcons).toHaveLength(1);
  });

  it('renders both sorting after headers clicked', async () => {
    const { getAllByTestId } = render(<ServersPage />);
    const headerItems = getAllByTestId(serversPage.headerItem);

    fireEvent.click(headerItems[0]);
    fireEvent.click(headerItems[1]);

    const headerIcons = getAllByTestId(serversPage.headerIcon);
    expect(headerIcons).toHaveLength(2);
  });

  it('renders preloader while data is fetching', async () => {
    jest.useFakeTimers();
    serversSpy.mockReset();
    serversSpy.mockImplementationOnce(
      () => new Promise((resolve) => {
        const wait = setTimeout(() => {
          clearTimeout(wait);
          resolve(mockAxiosResponse([]));
        }, 5000);
      }),
    );
    const { getByTestId } = render(<ServersPage />);

    expect(getByTestId(preloader.preloader)).toBeInTheDocument();
    jest.runAllTimers();
  });

  it('renders fetched data', async () => {
    const mockLocation = { name: 'Moon', distance: 384400 };
    serversSpy.mockReset();
    serversSpy.mockImplementationOnce(
      () => Promise.resolve(mockAxiosResponse([mockLocation])),
    );
    const { getByTestId } = render(<ServersPage />);
    await waitFor(() => getByTestId(serversPage.listItem));

    expect(
      getByTestId(serversPage.name),
    ).toHaveTextContent(mockLocation.name);
    expect(
      getByTestId(serversPage.distance),
    ).toHaveTextContent(mockLocation.distance.toString());
  });

  it('displays toast with error message on failed login', async () => {
    const error = { message: 'random error' };
    serversSpy.mockReset();
    serversSpy.mockImplementationOnce(
      () => Promise.reject(mockAxiosError(error, 401)),
    );
    const { getByTestId } = render(<ServersPage />);

    await waitFor(() => getByTestId(toast.toast));
    expect(getByTestId(toast.toast)).toHaveTextContent(error.message);
  });
});
