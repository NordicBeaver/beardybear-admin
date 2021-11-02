import { AppointmentDto } from '../api';
import { Barber, barberFromDto } from './Barber';
import { BarberService, barberServiceFromDto } from './BarberService';

export interface Appointment {
  id: number;
  barber: Barber;
  barberService: BarberService;
  datetime: Date;
  clientName: string;
  clientPhoneNumber: string;
}

export function appointmentFromDto(dto: AppointmentDto) {
  const appointment: Appointment = {
    id: dto.id,
    barber: barberFromDto(dto.barber),
    barberService: barberServiceFromDto(dto.barberService),
    datetime: new Date(dto.datetime),
    clientName: dto.clientName,
    clientPhoneNumber: dto.clientPhoneNumber,
  };
  return appointment;
}
