import React from 'react';
import { useGetBarbersQuery } from '../queries';

export default function BarbersTable() {
  const barbersQuery = useGetBarbersQuery();

  return (
    <div>{barbersQuery.status === 'success' ? barbersQuery.data.map((barber) => <div>{barber.name}</div>) : null}</div>
  );
}
