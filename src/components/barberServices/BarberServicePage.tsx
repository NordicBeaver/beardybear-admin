import React from 'react';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
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
