import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import { useAnyUsersQuery } from '../../queries';
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';

const LoginFormPageStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoginFormPage() {
  const anyUsersQuery = useAnyUsersQuery();
  const auth = useAuth()!;
  const history = useHistory();

  if (auth.token != null) {
    history.push('/');
  }

  if (anyUsersQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  if (anyUsersQuery.data === false) {
    history.push('/first-user');
  }

  return (
    <LoginFormPageStyled>
      <LoginForm></LoginForm>
    </LoginFormPageStyled>
  );
}
