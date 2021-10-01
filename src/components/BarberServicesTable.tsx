import React from 'react';
import { useGetBarberServicesQuery } from '../queries';
import { Table } from './Table';

export default function BarberServicesTable() {
  const barberServicesQuery = useGetBarberServicesQuery();

  if (!barberServicesQuery.isSuccess) {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {barberServicesQuery.data.map((barberService) => (
          <tr>
            <td>{barberService.name}</td>
            <td>${barberService.price}</td>
            <td>{barberService.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
