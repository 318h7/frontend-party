import servers, {
  startLoading, fetchSuccess, stopLoading, toggleNameSorting, toggleDistanceSorting,
} from '../servers-slice';

describe('servers reducer', () => {
  const mockServers = [
    { name: 'a', distance: 20 },
    { name: 'c', distance: 30 },
    { name: 'b', distance: 10 },
  ];

  const serversNameSorted = [
    { name: 'a', distance: 20 },
    { name: 'b', distance: 10 },
    { name: 'c', distance: 30 },
  ];

  const serversDistanceSorted = [
    { name: 'b', distance: 10 },
    { name: 'a', distance: 20 },
    { name: 'c', distance: 30 },
  ];

  it('should have initial state', () => {
    expect(servers(undefined, { type: 'any' })).toEqual({ servers: [], loading: false });
  });

  it('should handle START_LOADING', () => {
    expect(
      servers(
        undefined,
        { type: startLoading.type },
      ),
    ).toEqual({
      servers: [],
      loading: true,
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    expect(
      servers(
        undefined,
        {
          type: fetchSuccess.type,
          payload: mockServers,
        },
      ),
    ).toEqual({
      loading: false,
      servers: mockServers,
    });
  });

  it('should handle STOP_LOADING', () => {
    expect(
      servers(
        undefined,
        { type: stopLoading.type },
      ),
    ).toEqual({
      loading: false,
      servers: [],
    });
  });

  describe('sorting', () => {
    it('should handle default TOGGLE_NAME_SORTING', () => {
      expect(
        servers(
          undefined,
          { type: toggleNameSorting.type },
        ),
      ).toEqual({
        nameAscending: true,
        distanceAscending: undefined,
        loading: false,
        servers: [],
      });
    });

    it('should handle ascending TOGGLE_NAME_SORTING', () => {
      expect(
        servers(
          { servers: mockServers, nameAscending: false, loading: false },
          { type: toggleNameSorting.type },
        ),
      ).toEqual({
        nameAscending: true,
        loading: false,
        servers: serversNameSorted,
      });
    });

    it('should handle descending TOGGLE_NAME_SORTING', () => {
      expect(
        servers(
          { servers: mockServers, nameAscending: true, loading: false },
          { type: toggleNameSorting.type },
        ),
      ).toEqual({
        nameAscending: false,
        loading: false,
        servers: serversNameSorted.reverse(),
      });
    });

    it('should handle default TOGGLE_DISTANCE_SORTING', () => {
      expect(
        servers(
          undefined,
          { type: toggleDistanceSorting.type },
        ),
      ).toEqual({
        distanceAscending: true,
        nameAscending: undefined,
        loading: false,
        servers: [],
      });
    });

    it('should handle ascending TOGGLE_DISTANCEE_SORTING', () => {
      expect(
        servers(
          { servers: mockServers, distanceAscending: false, loading: false },
          { type: toggleDistanceSorting.type },
        ),
      ).toEqual({
        distanceAscending: true,
        loading: false,
        servers: serversDistanceSorted,
      });
    });

    it('should handle descending TOGGLE_DISTANCEE_SORTING', () => {
      expect(
        servers(
          { servers: mockServers, distanceAscending: true, loading: false },
          { type: toggleDistanceSorting.type },
        ),
      ).toEqual({
        distanceAscending: false,
        loading: false,
        servers: serversDistanceSorted.reverse(),
      });
    });
  });
});
