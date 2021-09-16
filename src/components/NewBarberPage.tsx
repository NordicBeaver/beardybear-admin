import React from 'react';
import styled from 'styled-components/macro';
import NewBarberForm from './NewBarberForm';

const PageHeading = styled.h2`
  font-weight: 500;
  font-size: 1.8em;
  margin: 0;
`;

export default function NewBarberPage() {
  return (
    <div>
      <PageHeading>New Barber</PageHeading>
      <NewBarberForm></NewBarberForm>
    </div>
  );
}
