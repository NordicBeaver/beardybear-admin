import React from 'react';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
import NewAppointmentForm from './NewAppointmentForm';

export default function NewAppointmentPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>New Appointment</PageHeading>
      </PageHeader>
      <NewAppointmentForm></NewAppointmentForm>
    </div>
  );
}
