import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 6px;
  border: none;
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.white};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.4px;
  line-height: 30px;
  cursor: pointer;

  &:active, &:focus{
    outline-color: rgba(0,0,0,0);
  }
  &:hover {
    outline-color: rgba(0,0,0,0);
    background-color: ${({ theme }) => theme.mainHover};
  }

  &:disabled {
    cursor: auto;
    background-color: ${({ theme }) => theme.textMain};
    color: ${({ theme }) => theme.placeholderText};

    &:hover {
      background-color: ${({ theme }) => theme.textMain};
    }
  }
`;

export const WhiteButton = styled(Button)`
  width: auto;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.whiteTextColor};
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.35px;

  &:hover {
    background-color: ${({ theme }) => theme.whiteHover};
  }
`;

export default Button;