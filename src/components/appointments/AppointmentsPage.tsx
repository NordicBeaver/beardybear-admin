import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
import AppointmentsTable from './AppointmentsTable';

export default function AppointmentsPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Appointments</PageHeading>
        <Link to="appointments/new">New Appointment</Link>
      </PageHeader>
      <AppointmentsTable></AppointmentsTable>
    </div>
  );
}
