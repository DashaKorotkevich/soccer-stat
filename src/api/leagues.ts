import { apiClient } from './client';
import { League } from '@/types';

export async function getLeagues(): Promise<League[]> {
  const response = await apiClient.get('/competitions');
  return response.data.competitions;
}