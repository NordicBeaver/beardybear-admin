import React from 'react';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
import AppointmentsTable from './AppointmentsTable';

export default function AppointmentsPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Appointments</PageHeading>
      </PageHeader>
      <AppointmentsTable></AppointmentsTable>
    </div>
  );
}
