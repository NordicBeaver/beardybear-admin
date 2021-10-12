import { Decimal } from 'decimal.js';
import { BarberServiceDto } from '../api';

export interface BarberService {
  id: number;
  name: string;
  price: Decimal;
  description: string;
}

export function barberServiceFromDto(dto: BarberServiceDto) {
  const barberService: BarberService = {
    id: dto.id,
    name: dto.name,
    price: new Decimal(dto.price),
    description: dto.description,
  };
  return barberService;
}
