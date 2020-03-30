import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from 'store/root-reducer';
import Preloader from 'components/preloader';
import { fetchServers, toggleName, toggleDistance } from 'store/servers/servers-slice';
import selectors from 'constants/selectors';

import {
  ListBody, ListItem, ListText, ListHeader, HeaderItem, HeaderIcon, HeaderText,
} from './styled';

const { serversPage } = selectors;

interface HeaderProps {
  ascending?: boolean;
  title: string;
  onClick: () => void;
}
const Header = ({ ascending, title, onClick }: HeaderProps) => (
  <HeaderItem
    onClick={onClick}
    data-qa={serversPage.headerItem}
  >
    <HeaderText>
      {title}
    </HeaderText>
    {
      ascending !== undefined
      && <HeaderIcon ascending={ascending} data-qa={serversPage.headerIcon} />
    }
  </HeaderItem>
);

const List = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServers());
  }, []);

  const {
    loading,
    servers,
    nameAscending,
    distanceAscending,
  } = useSelector((state: AppState) => state.servers);

  const drawList = () => servers.map((item) => (
    <ListItem key={item.name + item.distance} data-qa={serversPage.listItem}>
      <ListText data-qa={serversPage.name}>
        {item.name}
      </ListText>
      <ListText data-qa={serversPage.distance}>
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
        {loading ? <Preloader /> : drawList()}
      </ListBody>
    </>
  );
};

export default List;
