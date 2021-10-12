import React from 'react';
import { Link } from 'react-router-dom';
import { barberServiceFromDto } from '../../domain/BarberService';
import { useGetBarberServicesQuery } from '../../queries';
import { Table } from '../common/Table';

export default function BarberServicesTable() {
  const barberServicesQuery = useGetBarberServicesQuery();

  if (!barberServicesQuery.isSuccess) {
    return <p>Loading...</p>;
  }

  const barberServices = barberServicesQuery.data.map(barberServiceFromDto);

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
        {barberServices.map((barberService) => (
          <tr key={barberService.id}>
            <td>
              <Link to={`/services/${barberService.id}`}>{barberService.name}</Link>
            </td>
            <td>${barberService.price.toFixed(2)}</td>
            <td>{barberService.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
