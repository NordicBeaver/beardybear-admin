import React from 'react';
import styled from 'styled-components/macro';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
import NewAppointmentForm from './NewAppointmentForm';

const ContentContainer = styled.div`
  max-width: 460px;
`;

export default function NewAppointmentPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>New Appointment</PageHeading>
      </PageHeader>
      <ContentContainer>
        <NewAppointmentForm></NewAppointmentForm>
      </ContentContainer>
    </div>
  );
}
