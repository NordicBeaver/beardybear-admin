import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createBarber,
  createBarberService,
  getAppointments,
  getBarber,
  getBarbers,
  getBarberService,
  getBarberServices,
  updateBarber,
  updateBarberService,
} from './api';

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
  const mutation = useMutation(createBarber, {
    onSuccess: () => {
      queryClient.invalidateQueries('barbers');
    },
  });
  return mutation;
}

export function useUpdateBarberMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateBarber, {
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
  const mutation = useMutation(createBarberService, {
    onSuccess: () => {
      queryClient.invalidateQueries('barber-services');
    },
  });
  return mutation;
}

export function useUpdateBarberServiceMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateBarberService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('barber-services');
      queryClient.invalidateQueries(['barber-service', data.id]);
    },
  });
  return mutation;
}

export function useGetAppointmentsQuery() {
  const query = useQuery('appointments', getAppointments);
  return query;
}
