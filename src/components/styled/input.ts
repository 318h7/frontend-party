import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  padding-left: 20px;
  box-sizing: border-box;
  letter-spacing: 0.4px;
  font-size: 16px;
  color: {$props => props.theme.textMain};

  &:focus {
    border: none;
    outline-color: rgba(0,0,0,0);
  }

  &::placeholder {
    letter-spacing: 0.4px;
    font-weight: 300;
    color: ${(props) => props.theme.placeholderText};
  }

  &:disabled {
    cursor: auto;
    background-color: ${(props) => props.theme.inputDisabled};
    color: ${(props) => props.theme.textDisabled};
  }
`;

export const PasswordInput = styled(Input)`
  padding-left: 50px;
  background-image: url(/svg/password-icon.svg);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: 20px 1rem;
`;

export const UserInput = styled(Input)`
  padding-left: 50px;
  background-image: url(/svg/user-icon.svg);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: 20px 1rem;
`;

export default Input;
