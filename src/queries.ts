import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createAppointment,
  createBarber,
  CreateBarberDto,
  createBarberService,
  CreateBarberServiceDto,
  getAppointments,
  getBarber,
  getBarbers,
  getBarberService,
  getBarberServices,
  updateBarber,
  UpdateBarberDto,
  UpdateBarberSerivceDto,
  updateBarberService,
} from './api';
import { useAuth } from './components/auth/AuthContext';

export function useGetBarbersQuery() {
  const query = useQuery('barbers', getBarbers);
  return query;
}

export function useGetBarberQuery(id: number) {
  const query = useQuery(['barber', id], () => getBarber(id));
  return query;
}

export function useCreateBarberMutation() {
  const queryClient = useQueryClient();
  const auth = useAuth()!;
  const token = auth.token!;
  const mutation = useMutation((dto: CreateBarberDto) => createBarber(dto, token), {
    onSuccess: () => {
      queryClient.invalidateQueries('barbers');
    },
  });
  return mutation;
}

export function useUpdateBarberMutation() {
  const queryClient = useQueryClient();
  const auth = useAuth()!;
  const token = auth.token!;
  const mutation = useMutation((dto: UpdateBarberDto) => updateBarber(dto, token), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('barbers');
      queryClient.invalidateQueries(['barber', data.id]);
    },
  });
  return mutation;
}

export function useGetBarberServicesQuery() {
  const query = useQuery('barber-services', getBarberServices);
  return query;
}

export function useGetBarberServiceQuery(id: number) {
  const query = useQuery(['barber-service', id], () => getBarberService(id));
  return query;
}

export function useCreateBarberServiceMutation() {
  const queryClient = useQueryClient();
  const auth = useAuth()!;
  const token = auth.token!;
  const mutation = useMutation((dto: CreateBarberServiceDto) => createBarberService(dto, token), {
    onSuccess: () => {
      queryClient.invalidateQueries('barber-services');
    },
  });
  return mutation;
}

export function useUpdateBarberServiceMutation() {
  const queryClient = useQueryClient();
  const auth = useAuth()!;
  const token = auth.token!;
  const mutation = useMutation((dto: UpdateBarberSerivceDto) => updateBarberService(dto, token), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('barber-services');
      queryClient.invalidateQueries(['barber-service', data.id]);
    },
  });
  return mutation;
}

export function useGetAppointmentsQuery() {
  const auth = useAuth()!;
  const token = auth.token!;
  const query = useQuery('appointments', () => getAppointments(token));
  return query;
}

export function useCreateAppointmentMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });
  return mutation;
}
