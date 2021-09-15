import { useQuery } from 'react-query';
import { getBarbers } from './api';

export function useGetBarbersQuery() {
  const query = useQuery('barbers', getBarbers);
  return query;
}
