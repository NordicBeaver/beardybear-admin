import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import BarbersTable from './BarbersTable';

const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
`;

const PageHeading = styled.h2`
  font-weight: 500;
  font-size: 1.8em;
  margin: 0;
`;

export default function BarbersPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Barbers</PageHeading>
        <Link to="barbers/new">New Barber</Link>
      </PageHeader>
      <BarbersTable></BarbersTable>
    </div>
  );
}
