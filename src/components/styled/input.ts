import styled from 'styled-components';

interface InputProps {
  readonly error?: boolean,
  theme: any;
}


const Input = styled.input<InputProps>`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  padding-left: 20px;
  box-sizing: border-box;
  letter-spacing: 0.4px;
  font-size: 16px;
  color: ${({ theme }) => theme.textMain};
  border: ${({ error, theme }: InputProps) => (error ? (`2px solid ${theme.error}`) : 'none')};

  &:focus {
    border: none;
    outline-color: rgba(0,0,0,0);
    border: ${({ error, theme }: InputProps) => (error ? (`2px solid ${theme.error}`) : 'none')};
  }

  &::placeholder {
    letter-spacing: 0.4px;
    font-weight: 300;
    color: ${({ error, theme }) => (error ? theme.error : theme.placeholderText)};
  }

  &:disabled {
    cursor: auto;
    background-color: ${({ theme }) => theme.inputDisabled};
    color: ${({ theme }) => theme.textDisabled};
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
