import React from 'react';
import { PageHeader } from './PageHeader';
import { PageHeading } from './PageHeading';
import UpdateBarberServiceForm from './UpdateBarberServiceForm';

export default function BarberServicePage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Service</PageHeading>
      </PageHeader>
      <UpdateBarberServiceForm></UpdateBarberServiceForm>
    </div>
  );
}
