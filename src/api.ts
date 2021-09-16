import axios from 'axios';

const host = 'http://localhost:3000';

export interface BarberDto {
  id: number;
  name: string;
  description: string;
}

export async function getBarbers() {
  const response = await axios.get<BarberDto[]>(`${host}/barbers`);
  const data = response.data;
  return data;
}

export async function getBarber(id: number) {
  const response = await axios.get<BarberDto>(`${host}/barbers/${id}`);
  const data = response.data;
  return data;
}

export interface CreateBarberDto {
  name: string;
  description: string;
}

export async function createBarber(dto: CreateBarberDto) {
  const response = await axios.post<BarberDto>(`${host}/barbers`, dto);
  const data = response.data;
  return data;
}
