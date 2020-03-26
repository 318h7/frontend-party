import React from 'react';
import styled from 'styled-components';

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  background-color: ${({ theme }) => theme.listHeader};
  height: 58px;
  border-top: 1px solid ${({ theme }) => theme.tableBorder};
  border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
`;

const ListBody = styled.div`
  height: calc(100vh - 170px);
  overflow-x: auto;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  height: 58px;
  border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
`;

const ListText = styled.span`
  color: ${({ theme }) => theme.textLight};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.4px;
  line-height: 30px;
`;

const HeaderItem = styled.span`
  color: ${({ theme }) => theme.textMain};
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1.4px;
  line-height: 30px;
  text-transform: uppercase;
`;


const List = () => {
  const items = [
    {
      name: 'Canada #10',
      distance: '9203 km',
    },
    {
      name: 'Lithuania #2',
      distance: '203 km',
    },
    {
      name: 'France #7',
      distance: '3421 km',
    },
    {
      name: 'Canada #3',
      distance: '1304 km',
    },
    {
      name: 'Poland #4',
      distance: '703 km',
    },
    {
      name: 'Germany #1',
      distance: '1221 km',
    },
  ];


  const drawList = () => items.map((item) => (
    <ListItem key={item.name}>
      <ListText>
        {item.name}
      </ListText>
      <ListText>
        {item.distance}
      </ListText>
    </ListItem>
  ));

  return (
    <>
      <ListHeader>
        <HeaderItem>Server</HeaderItem>
        <HeaderItem>Distance</HeaderItem>
      </ListHeader>
      <ListBody>
        {drawList()}
      </ListBody>
    </>
  );
};

export default List;
