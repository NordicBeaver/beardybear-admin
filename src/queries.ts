import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createBarber, getBarbers } from './api';

export function useGetBarbersQuery() {
  const query = useQuery('barbers', getBarbers);
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
