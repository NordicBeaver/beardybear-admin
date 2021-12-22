import React from 'react';
import { Link } from 'react-router-dom';
import { GetBarberServicesRequestParams } from '../../api';
import { barberServiceFromDto } from '../../domain/BarberService';
import { useSortField } from '../../hooks/useSortField';
import { useGetBarberServicesQuery } from '../../queries';
import { Table } from '../common/Table';
import TableHeader from '../common/TableHeader';

export default function BarberServicesTable() {
  const { sortField, sortOrder, updateSorting } = useSortField<GetBarberServicesRequestParams['sortField']>('name');

  const barberServicesQuery = useGetBarberServicesQuery({ sortField: sortField, sortOrder: sortOrder });

  if (!barberServicesQuery.isSuccess) {
    return <p>Loading...</p>;
  }

  const barberServices = barberServicesQuery.data.map(barberServiceFromDto);

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
          <TableHeader
            sortable={true}
            sortOrder={sortField === 'price' ? sortOrder : undefined}
            onClick={() => updateSorting('price')}
          >
            Price
          </TableHeader>
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
