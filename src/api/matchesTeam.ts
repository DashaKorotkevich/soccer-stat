import { apiClient } from './client';
import { Match, MatchParams } from '@/types';

export async function getTeamMatches(
  teamId: number | string,
  params?: MatchParams
): Promise<Match[]> {
  const response = await apiClient.get(`/teams/${teamId}/matches`, {
    params,
  });

  return response.data.matches || [];
}