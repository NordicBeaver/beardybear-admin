import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { GetBarbersRequestParams, imageUrl } from '../../api';
import { barberFromDto } from '../../domain/Barber';
import { useSortField } from '../../hooks/useSortField';
import { useGetBarbersQuery } from '../../queries';
import { Table } from '../common/Table';
import TableHeader from '../common/TableHeader';

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 1em;
`;

export interface BarbersTableProps {
  showDeleted?: boolean;
}

export default function BarbersTable({ showDeleted = false }: BarbersTableProps) {
  const { sortField, sortOrder, updateSorting } = useSortField<GetBarbersRequestParams['sortField']>('name');

  const barbersQuery = useGetBarbersQuery({ includeDeleted: showDeleted, sortField: sortField, sortOrder: sortOrder });

  if (!barbersQuery.isSuccess) {
    return <p>Loading...</p>;
  }

  const barbers = barbersQuery.data.map(barberFromDto);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader
            sortable={true}
            sortOrder={sortField === 'name' ? sortOrder : undefined}
            onClick={() => updateSorting('name')}
          >
            Name
          </TableHeader>
          <TableHeader>Picture</TableHeader>
          <TableHeader
            sortable={true}
            sortOrder={sortField === 'description' ? sortOrder : undefined}
            onClick={() => updateSorting('description')}
          >
            Description
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        {barbers.map((barber) => (
          <tr key={barber.id}>
            <td>
              <Link to={`/barbers/${barber.id}`}>{barber.name}</Link>
              {barber.deletedAt !== undefined ? ' [deleted]' : null}
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
