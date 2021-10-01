import React from 'react';
import styled from 'styled-components/macro';
import { useGetBarberServicesQuery } from '../queries';

const Table = styled.table`
  width: 100%;
  th {
    text-align: start;
    padding: 0.5em 1em 1em 0;
  }
  td {
    padding: 0.5em 1em 0.5em 0;
  }
`;

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
