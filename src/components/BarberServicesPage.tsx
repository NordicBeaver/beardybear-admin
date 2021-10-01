import React from 'react';
import styled from 'styled-components/macro';
import BarberServicesTable from './BarberServicesTable';

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

export default function BarberServicesPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Barber Services</PageHeading>
      </PageHeader>
      <BarberServicesTable></BarberServicesTable>
    </div>
  );
}
