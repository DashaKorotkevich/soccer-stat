// src/api/matchesLeague.ts
import { apiClient } from './client';
import { Match, MatchParams } from '@/types';

export async function getLeagueMatches(
  leagueId: number | string,
  params?: MatchParams
): Promise<Match[]> {
  const response = await apiClient.get(`/competitions/${leagueId}/matches`, {
    params,
  });

  return response.data.matches || [];
}
