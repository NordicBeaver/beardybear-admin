import React from 'react';
import { Link } from 'react-router-dom';
import BarberServicesTable from './BarberServicesTable';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';

export default function BarberServicesPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Services</PageHeading>
        <Link to="services/new">New Service</Link>
      </PageHeader>
      <BarberServicesTable></BarberServicesTable>
    </div>
  );
}
