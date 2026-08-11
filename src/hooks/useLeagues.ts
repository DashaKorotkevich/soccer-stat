// hooks/useLeagues.ts
import { useQuery } from '@tanstack/react-query';
import { getLeagues } from '@api/leagues';

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: getLeagues,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
