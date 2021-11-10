import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAnyUsersQuery } from '../../queries';
import FirstUserForm from './FirstUserForm';

const FirstUserPageStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function FirstUserPage() {
  const anyUsersQuery = useAnyUsersQuery();
  const history = useHistory();

  if (anyUsersQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  if (anyUsersQuery.data === true) {
    history.push('/login');
  }

  return (
    <FirstUserPageStyled>
      <h2>Welcome to BeardyBear admin panel!</h2>
      <FirstUserForm></FirstUserForm>
    </FirstUserPageStyled>
  );
}
