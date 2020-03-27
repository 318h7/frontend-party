import styled, { keyframes } from 'styled-components';

interface HeaderIconProps {
  ascending: boolean,
}

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  background-color: ${({ theme }) => theme.listHeader};
  height: 58px;
  border-top: 1px solid ${({ theme }) => theme.tableBorder};
  border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
`;

export const ListBody = styled.div`
  height: calc(100vh - 170px);
  overflow-x: auto;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  height: 58px;
  border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
`;

export const ListText = styled.span`
  color: ${({ theme }) => theme.textLight};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.4px;
  line-height: 30px;
`;

export const HeaderItem = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const HeaderText = styled.div`
  color: ${({ theme }) => theme.textMain};
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1.4px;
  line-height: 30px;
  text-transform: uppercase;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const rotateReverse = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const HeaderIcon = styled.div`
  margin-left: 10px;
  height: 26px;
  width: 20px;
  background-image: url(/svg/down-arrow.svg);
  background-repeat: no-repeat;
  animation: ${({ ascending }: HeaderIconProps) => (ascending ? rotate : rotateReverse)} 0.2s forwards;
`;
