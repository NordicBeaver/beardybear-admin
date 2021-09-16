import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createBarber, getBarber, getBarbers } from './api';

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
