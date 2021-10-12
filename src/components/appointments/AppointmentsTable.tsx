import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAppointmentsQuery } from '../../queries';
import { Table } from '../common/Table';

export default function AppointmentsTable() {
  const appointmentsQuery = useGetAppointmentsQuery();

  if (appointmentsQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Barber</th>
          <th>Service</th>
          <th>Date and Time</th>
        </tr>
      </thead>
      <tbody>
        {appointmentsQuery.data.map((appointment) => (
          <tr key={appointment.id}>
            <td>
              <Link to={`/barbers/${appointment.barber.id}`}>{appointment.barber.name}</Link>
            </td>
            <td>
              <Link to={`/services/${appointment.barberService.id}`}>{appointment.barberService.name}</Link>
            </td>
            <td>{appointment.datetime}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
