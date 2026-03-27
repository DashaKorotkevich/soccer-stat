// src/api/matchesLeague.ts
import { apiClient } from './client';
import { Match } from '@/types';

// Получить матчи конкретной лиги
export async function getLeagueMatches(leagueId: number): Promise<Match[]> {
  const response = await apiClient.get(`/competitions/${leagueId}/matches`);
  return response.data.matches || [];
}

// Получить матчи лиги с фильтром по датам
export async function getLeagueMatchesWithDates(
  leagueId: number, 
  dateFrom: string, 
  dateTo: string
): Promise<Match[]> {
  const response = await apiClient.get(`/competitions/${leagueId}/matches`, {
    params: { dateFrom, dateTo }
  });
  return response.data.matches || [];
}