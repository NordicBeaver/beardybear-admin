import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  anyUsers,
  createAppointment,
  createBarber,
  CreateBarberDto,
  createBarberService,
  CreateBarberServiceDto,
  createFirstUser,
  createUser,
  createUserDto,
  deleteBarber,
  getAppointments,
  getAppointmentsCount,
  GetAppointmentsRequestParams,
  getBarber,
  getBarbers,
  getBarberService,
  getBarberServices,
  GetBarberServicesRequestParams,
  GetBarbersRequestParams,
  getUserRoles,
  getUsers,
  GetUsersRequestParams,
  updateBarber,
  UpdateBarberDto,
  UpdateBarberSerivceDto,
  updateBarberService,
} from './api';
import { useAuth } from './components/auth/AuthContext';

export function useGetUserRolesQuery() {
  const auth = useAuth()!;
  const token = auth.token!;
  const query = useQuery('userRoles', () => getUserRoles(token));
  return query;
}

export function useAnyUsersQuery() {
  const query = useQuery('anyUsers', anyUsers);
  return query;
}

export function useGetUsersQuery(params: GetUsersRequestParams) {
  const auth = useAuth()!;
  const token = auth.token!;
  const query = useQuery(['users', params], () => getUsers(params, token));
  return query;
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const auth = useAuth()!;
  const token = auth.token!;
  const mutation = useMutation((dto: createUserDto) => createUser(dto, token), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      queryClient.invalidateQueries('anyUsers');
    },
  });
  return mutation;
}

export function useCreateFirstUserMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createFirstUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      queryClient.invalidateQueries('anyUsers');
    },
  });
  return mutation;
}

export function useGetBarbersQuery(params?: GetBarbersRequestParams) {
  const query = useQuery(['barbers', params], () => getBarbers(params));
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

export function useDeleteBarberMutation() {
  const queryClient = useQueryClient();
  const auth = useAuth()!;
  const token = auth.token!;
  const mutation = useMutation((barberId: number) => deleteBarber(barberId, token), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('barbers');
      queryClient.invalidateQueries(['barber', data.id]);
    },
  });
  return mutation;
}

export function useGetBarberServicesQuery(params?: GetBarberServicesRequestParams) {
  const query = useQuery(['barber-services', params], () => getBarberServices(params));
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

export function useGetAppointmentsQuery(params: GetAppointmentsRequestParams) {
  const auth = useAuth()!;
  const token = auth.token!;
  const query = useQuery(['appointments', params], () => getAppointments(params, token));
  return query;
}

export function useGetAppointmentsCountQuery() {
  const auth = useAuth()!;
  const token = auth.token!;
  const query = useQuery(['appointmentsCount'], () => getAppointmentsCount(token));
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
