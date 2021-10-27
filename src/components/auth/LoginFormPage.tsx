import React from 'react';
import styled from 'styled-components/macro';
import LoginForm from './LoginForm';

const LoginFormPageStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoginFormPage() {
  return (
    <LoginFormPageStyled>
      <LoginForm></LoginForm>
    </LoginFormPageStyled>
  );
}
