import React from 'react';
import NewBarberServiceForm from './NewBarberServiceForm';
import { PageHeader } from './PageHeader';
import { PageHeading } from './PageHeading';

export default function NewBarberServicePage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>New Service</PageHeading>
      </PageHeader>
      <NewBarberServiceForm></NewBarberServiceForm>
    </div>
  );
}
