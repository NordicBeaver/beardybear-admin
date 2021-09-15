import React from 'react';
import styled from 'styled-components/macro';
import BarbersTable from './BarbersTable';
import NewBarberForm from './NewBarberForm';

const PageHeading = styled.h2`
  font-weight: 500;
  font-size: 1.8em;
  margin: 0;
`;

export default function BarbersPage() {
  return (
    <div>
      <PageHeading>Barbers</PageHeading>
      <NewBarberForm></NewBarberForm>
      <BarbersTable></BarbersTable>
    </div>
  );
}
