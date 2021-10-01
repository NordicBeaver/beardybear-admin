import React from 'react';
import { Link } from 'react-router-dom';
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
            <td>
              <Link to={`/services/${barberService.id}`}>{barberService.name}</Link>
            </td>
            <td>${barberService.price}</td>
            <td>{barberService.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
