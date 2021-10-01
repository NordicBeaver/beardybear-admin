import React from 'react';
import { Link } from 'react-router-dom';
import { useGetBarbersQuery } from '../queries';
import { Table } from './Table';

export default function BarbersTable() {
  const barbersQuery = useGetBarbersQuery();

  if (!barbersQuery.isSuccess) {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {barbersQuery.data.map((barber) => (
          <tr>
            <td>
              <Link to={`/barbers/${barber.id}`}>{barber.name}</Link>
            </td>
            <td>{barber.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
