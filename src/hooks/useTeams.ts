import { useQuery } from '@tanstack/react-query';
import { getTeams } from '@api/teams';

export const useTeams = () => {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
