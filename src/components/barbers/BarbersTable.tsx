import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { GetBarbersRequestParams, imageUrl } from '../../api';
import { barberFromDto } from '../../domain/Barber';
import { useGetBarbersQuery } from '../../queries';
import { Table } from '../common/Table';

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 1em;
`;

const SortableHeader = styled.span`
  cursor: pointer;
`;

export interface BarbersTableProps {
  showDeleted?: boolean;
}

export default function BarbersTable({ showDeleted = false }: BarbersTableProps) {
  const [sortField, setSortField] = useState<GetBarbersRequestParams['sortField']>('name');
  const [sortOrder, setSortOrder] = useState<GetBarbersRequestParams['sortOrder']>('asc');

  const updateSorting = (newSortField: GetBarbersRequestParams['sortField']) => {
    if (newSortField === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(newSortField);
      setSortOrder('asc');
    }
  };

  const barbersQuery = useGetBarbersQuery({ includeDeleted: showDeleted, sortField: sortField, sortOrder: sortOrder });

  if (!barbersQuery.isSuccess) {
    return <p>Loading...</p>;
  }

  const barbers = barbersQuery.data.map(barberFromDto);

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <SortableHeader onClick={() => updateSorting('name')}>
              Name {sortField === 'name' ? sortOrder === 'asc' ? <ArrowDown></ArrowDown> : <ArrowUp></ArrowUp> : null}
            </SortableHeader>
          </th>
          <th>Picture</th>
          <th onClick={() => updateSorting('description')}>
            <SortableHeader onClick={() => updateSorting('description')}>
              Description{' '}
              {sortField === 'description' ? sortOrder === 'asc' ? <ArrowDown></ArrowDown> : <ArrowUp></ArrowUp> : null}
            </SortableHeader>
          </th>
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
