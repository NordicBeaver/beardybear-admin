import axios from 'axios';

const host = 'http://localhost:3000';

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function imageUrl(filename: string) {
  return `${host}/images/${filename}`;
}

export interface BarberDto {
  id: number;
  name: string;
  description: string;
  picture: string | null;
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
  picture: string | null;
}

export async function createBarber(dto: CreateBarberDto, token: string) {
  const response = await axios.post<BarberDto>(`${host}/barbers`, dto, { headers: authHeaders(token) });
  const data = response.data;
  return data;
}

export interface UpdateBarberDto {
  id: number;
  name: string;
  description: string;
  picture: string | null;
}

export async function updateBarber(dto: UpdateBarberDto, token: string) {
  const response = await axios.post<BarberDto>(`${host}/barbers/update`, dto, { headers: authHeaders(token) });
  const data = response.data;
  return data;
}

export interface BarberServiceDto {
  id: number;
  name: string;
  price: string;
  description: string;
}

export async function getBarberServices() {
  const response = await axios.get<BarberServiceDto[]>(`${host}/barber-services`);
  const data = response.data;
  return data;
}

export async function getBarberService(id: number) {
  const response = await axios.get<BarberServiceDto>(`${host}/barber-services/${id}`);
  const data = response.data;
  return data;
}

export interface CreateBarberServiceDto {
  name: string;
  price: string;
  description: string;
}

export async function createBarberService(dto: CreateBarberServiceDto, token: string) {
  const response = await axios.post<BarberServiceDto>(`${host}/barber-services`, dto, { headers: authHeaders(token) });
  const data = response.data;
  return data;
}

export interface UpdateBarberSerivceDto {
  id: number;
  name: string;
  price: string;
  description: string;
}

export async function updateBarberService(dto: UpdateBarberSerivceDto, token: string) {
  const response = await axios.post<BarberServiceDto>(`${host}/barber-services/update`, dto, {
    headers: authHeaders(token),
  });
  const data = response.data;
  return data;
}

export async function uploadImage(file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post<string>(`${host}/images`, formData, { headers: authHeaders(token) });
  const data = response.data;
  return data;
}

export interface AppointmentDto {
  id: number;
  barber: BarberDto;
  barberService: BarberServiceDto;
  datetime: string;
}

export async function getAppointments(token: string) {
  const response = await axios.get<AppointmentDto[]>(`${host}/appointments`, { headers: authHeaders(token) });
  const data = response.data;
  return data;
}

export interface CreateAppointmentsDto {
  barberId: number;
  barberServiceId: number;
  datetime: string;
}

export async function createAppointment(dto: CreateAppointmentsDto) {
  const response = await axios.post<AppointmentDto>(`${host}/appointments`, dto);
  const data = response.data;
  return data;
}

export interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export async function login(credentials: Credentials) {
  const response = await axios.post<LoginResponse>(`${host}/auth/login`, credentials);
  if (response.status === 201) {
    return response.data.accessToken;
  } else {
    return null;
  }
}
