import React from 'react';
import styled from 'styled-components/macro';
import NewBarberForm from './NewBarberForm';
import { PageHeader } from '../common/PageHeader';

const PageHeading = styled.h2`
  font-weight: 500;
  font-size: 1.8em;
  margin: 0;
`;

export default function NewBarberPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>New Barber</PageHeading>
      </PageHeader>
      <NewBarberForm></NewBarberForm>
    </div>
  );
}
