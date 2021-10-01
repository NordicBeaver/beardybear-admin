import React from 'react';
import BarberServicesTable from './BarberServicesTable';
import { PageHeader } from './PageHeader';
import { PageHeading } from './PageHeading';

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
