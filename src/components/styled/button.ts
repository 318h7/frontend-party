import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.white};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.4px;
  line-height: 30px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.mainHover};
  }

  &:disabled {
    cursor: auto;
    background-color: ${(props) => props.theme.textMain};
    color: ${(props) => props.theme.placeholderText};

    &:hover {
      background-color: ${(props) => props.theme.textMain};
    }
  }
`;

export default Button;
