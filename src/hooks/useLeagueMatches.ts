import { useQuery } from '@tanstack/react-query';
import { getLeagueMatches } from '@api/matchesLeague';

export const useLeagueMatches = (leagueId: string, dateFrom?: string, dateTo?: string) => {
  return useQuery({
    queryKey: ['leagueMatches', leagueId, { dateFrom, dateTo }],
    queryFn: () => getLeagueMatches(leagueId, { dateFrom, dateTo }),
    enabled: Boolean(leagueId),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
