import React from 'react';
import styled from 'styled-components/macro';
import BarbersTable from './BarbersTable';

const PageHeading = styled.h2`
  font-weight: 500;
  font-size: 1.8em;
  margin: 0;
`;

export default function BarbersPage() {
  return (
    <div>
      <PageHeading>Barbers</PageHeading>
      <BarbersTable></BarbersTable>
    </div>
  );
}
