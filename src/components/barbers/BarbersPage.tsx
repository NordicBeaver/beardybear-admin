import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BarbersTable from './BarbersTable';
import { PageHeader } from '../common/PageHeader';
import { PageHeading } from '../common/PageHeading';
import CheckBox from '../common/CheckBox';

export default function BarbersPage() {
  const [showDeletedBarbers, setShowDeletedBarbers] = useState(false);

  return (
    <div>
      <PageHeader>
        <PageHeading>Barbers</PageHeading>
        <Link to="barbers/new">New Barber</Link>
      </PageHeader>
      <div>
        <CheckBox label="Show Deleted" value={showDeletedBarbers} onChange={(v) => setShowDeletedBarbers(v)}></CheckBox>
      </div>
      <BarbersTable showDeleted={showDeletedBarbers}></BarbersTable>
    </div>
  );
}
