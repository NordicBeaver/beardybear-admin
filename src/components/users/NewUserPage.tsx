import React from 'react';
import styled from 'styled-components/macro';
import { PageHeader } from '../common/PageHeader';
import NewUserForm from './NewUserForm';

const ContentContainer = styled.div`
  max-width: 460px;
`;

export default function NewUserPage() {
  return (
    <div>
      <PageHeader>
        <PageHeader>New User</PageHeader>
      </PageHeader>
      <ContentContainer>
        <NewUserForm></NewUserForm>
      </ContentContainer>
    </div>
  );
}
