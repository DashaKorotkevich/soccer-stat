import { useQuery } from '@tanstack/react-query';
import { getTeamMatches } from '@api/matchesTeam.ts';

export const useTeamMatches = (teamId: string, dateFrom?: string, dateTo?: string) => {
  return useQuery({
    queryKey: ['teamMatches', teamId, { dateFrom, dateTo }],
    queryFn: () => getTeamMatches(teamId, { dateFrom, dateTo }),
    enabled: Boolean(teamId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
