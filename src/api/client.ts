import axios, { AxiosError } from 'axios';

const isDev = import.meta.env.DEV;
const API_URL = 'https://api.football-data.org/v4';
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

const BASE_URL = isDev
  ? '/api'
  : `https://cors-anywhere.herokuapp.com/${API_URL}`;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (API_KEY) {
    config.headers['X-Auth-Token'] = API_KEY;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.message);
    if (error.response?.status === 403) {
      console.error('403: Проверь API ключ или прокси');
    }
    if (error.response?.status === 429) {
      console.error('Слишком много запросов. Подожди.');
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 403) {
      return 'Ошибка API. Проверьте ключ или прокси.';
    }
    return error.response?.data?.message || error.message || 'Ошибка API';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Неизвестная ошибка';
}