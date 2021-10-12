import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { imageUrl } from '../../api';
import { barberFromDto } from '../../domain/Barber';
import { useGetBarbersQuery } from '../../queries';
import { Table } from '../common/Table';

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 1em;
`;

export default function BarbersTable() {
  const barbersQuery = useGetBarbersQuery();

  if (!barbersQuery.isSuccess) {
    return <p>Loading...</p>;
  }

  const barbers = barbersQuery.data.map(barberFromDto);

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Picture</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {barbers.map((barber) => (
          <tr key={barber.id}>
            <td>
              <Link to={`/barbers/${barber.id}`}>{barber.name}</Link>
            </td>
            <td>
              {barber.picture != null ? (
                <Image src={imageUrl(barber.picture)} alt={`Picture of ${barber.name}`}></Image>
              ) : null}
            </td>
            <td>{barber.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
