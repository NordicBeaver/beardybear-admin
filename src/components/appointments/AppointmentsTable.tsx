import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GetAppointmentsRequestParams } from '../../api';
import { appointmentFromDto } from '../../domain/Appointment';
import { useSortField } from '../../hooks/useSortField';
import { useGetAppointmentsCountQuery, useGetAppointmentsQuery } from '../../queries';
import Pagination from '../common/Pagination';
import { Table } from '../common/Table';
import TableHeader from '../common/TableHeader';

const PAGE_SIZE = 10;

export default function AppointmentsTable() {
  const { sortField, sortOrder, updateSorting } = useSortField<GetAppointmentsRequestParams['sortField']>(
    'datetime',
    'desc'
  );

  const [page, setPage] = useState(1);

  const appointmentsQuery = useGetAppointmentsQuery({
    sortField: sortField,
    sortOrder: sortOrder,
    offset: (page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  });
  const appointmentsCountQuery = useGetAppointmentsCountQuery();

  if (appointmentsQuery.status !== 'success' || appointmentsCountQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const pagesCount = Math.ceil(appointmentsCountQuery.data / PAGE_SIZE);

  const appointments = appointmentsQuery.data.map(appointmentFromDto);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <TableHeader>Client</TableHeader>
            <TableHeader
              sortable={true}
              sortOrder={sortField === 'barber' ? sortOrder : undefined}
              onClick={() => updateSorting('barber')}
            >
              Barber
            </TableHeader>
            <TableHeader
              sortable={true}
              sortOrder={sortField === 'service' ? sortOrder : undefined}
              onClick={() => updateSorting('service')}
            >
              Service
            </TableHeader>
            <TableHeader
              sortable={true}
              sortOrder={sortField === 'datetime' ? sortOrder : undefined}
              onClick={() => updateSorting('datetime')}
            >
              Date and Time
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                {appointment.clientName} ({appointment.clientPhoneNumber})
              </td>
              <td>
                <Link to={`/barbers/${appointment.barber.id}`}>{appointment.barber.name}</Link>
              </td>
              <td>
                <Link to={`/services/${appointment.barberService.id}`}>{appointment.barberService.name}</Link>
              </td>
              <td>{appointment.datetime.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination pagesCount={pagesCount} currentPage={page} onPageChange={(newPage) => setPage(newPage)}></Pagination>
    </div>
  );
}
