import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
import UsersTable from './UsersTable';

export default function UsersPage() {
  return (
    <div>
      <PageHeader>
        <PageHeading>Users</PageHeading>
        <Link to="users/new">New User</Link>
      </PageHeader>
      <UsersTable></UsersTable>
    </div>
  );
}
