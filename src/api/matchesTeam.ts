import { apiClient } from './client';
import { Match } from '@/types';

// Получить матчи конкретной команды
export async function getTeamMatches(teamId: number): Promise<Match[]> {
  const response = await apiClient.get(`/teams/${teamId}/matches`);
  return response.data.matches || [];
}

// Получить матчи конкретной команды с фильтром по датам
export async function getTeamMatchesWithDates(
  teamId: number,
  dateFrom: string,
  dateTo: string
): Promise<Match[]> {
  const response = await apiClient.get(`/teams/${teamId}/matches`, {
    params: { dateFrom, dateTo },
  });
  return response.data.matches || [];
}
