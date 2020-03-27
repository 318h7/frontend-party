import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from 'store/root-reducer';
import { fetchServers, toggleName, toggleDistance } from 'store/servers/servers-slice';

import {
  ListBody, ListItem, ListText, ListHeader, HeaderItem, HeaderIcon, HeaderText,
} from './styled';

interface HeaderProps {
  ascending?: boolean;
  title: string;
  onClick: () => void;
}
const Header = ({ ascending, title, onClick }: HeaderProps) => (
  <HeaderItem onClick={onClick}>
    <HeaderText>
      {title}
    </HeaderText>
    {
      ascending !== undefined
      && <HeaderIcon ascending={ascending} />
    }
  </HeaderItem>
);

const List = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServers());
  }, []);

  const {
    // loading,
    servers,
    nameAscending,
    distanceAscending,
  } = useSelector((state: AppState) => state.servers);

  const drawList = () => servers.map((item) => (
    <ListItem key={item.name + item.distance}>
      <ListText>
        {item.name}
      </ListText>
      <ListText>
        {`${item.distance} km`}
      </ListText>
    </ListItem>
  ));

  const handleNameClick = () => {
    dispatch(toggleName());
  };

  const handleDistanceClick = () => {
    dispatch(toggleDistance());
  };

  return (
    <>
      <ListHeader>
        <Header
          ascending={nameAscending}
          onClick={handleNameClick}
          title="Server"
        />
        <Header
          ascending={distanceAscending}
          onClick={handleDistanceClick}
          title="Distance"
        />
      </ListHeader>
      <ListBody>
        {drawList()}
      </ListBody>
    </>
  );
};

export default List;
