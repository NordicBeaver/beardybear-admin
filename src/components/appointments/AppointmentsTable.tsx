import React from 'react';
import { Link } from 'react-router-dom';
import { appointmentFromDto } from '../../domain/Appointment';
import { useGetAppointmentsQuery } from '../../queries';
import { Table } from '../common/Table';

export default function AppointmentsTable() {
  const appointmentsQuery = useGetAppointmentsQuery();

  if (appointmentsQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const appointments = appointmentsQuery.data.map(appointmentFromDto);

  return (
    <Table>
      <thead>
        <tr>
          <th>Client</th>
          <th>Barber</th>
          <th>Service</th>
          <th>Date and Time</th>
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
