import React from 'react';
import styled from 'styled-components/macro';
import { useGetBarbersQuery } from '../queries';

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
            <td>{barber.name}</td>
            <td>{barber.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
