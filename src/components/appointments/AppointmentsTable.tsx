import React from 'react';
import { Link } from 'react-router-dom';
import { GetAppointmentsRequestParams } from '../../api';
import { appointmentFromDto } from '../../domain/Appointment';
import { useSortField } from '../../hooks/useSortField';
import { useGetAppointmentsQuery } from '../../queries';
import { Table } from '../common/Table';
import TableHeader from '../common/TableHeader';

export default function AppointmentsTable() {
  const { sortField, sortOrder, updateSorting } = useSortField<GetAppointmentsRequestParams['sortField']>(
    'datetime',
    'desc'
  );

  const appointmentsQuery = useGetAppointmentsQuery({ sortField: sortField, sortOrder: sortOrder });

  if (appointmentsQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const appointments = appointmentsQuery.data.map(appointmentFromDto);

  return (
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
  );
}
