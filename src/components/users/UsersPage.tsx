import React from 'react';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
import UsersTable from './UsersTable';

export default function UsersPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Users</PageHeading>
      </PageHeader>
      <UsersTable></UsersTable>
    </div>
  );
}
