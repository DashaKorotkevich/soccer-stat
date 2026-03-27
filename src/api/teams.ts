import { apiClient } from './client';
import { Team } from '@/types';

export async function getTeams(): Promise<Team[]> {
  const response = await apiClient.get('/teams');
  return response.data.teams;
}