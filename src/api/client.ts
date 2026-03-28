import axios, { AxiosError } from 'axios';

const isDev = import.meta.env.DEV;
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://api.football-data.org/v4';

const BASE_URL = isDev
  ? '/api'
  : `${CORS_PROXY}${API_URL}`;

console.log('Environment:', isDev ? 'development' : 'production');
console.log('BASE_URL:', BASE_URL);

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
  if (API_KEY) {
    config.headers['X-Auth-Token'] = API_KEY;
  }
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status);
    return response;
  },
  (error: AxiosError) => {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_NETWORK') {
      return 'Ошибка сети. Проверьте подключение к интернету.';
    }
    return error.response?.data?.message || error.message || 'Ошибка API';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Неизвестная ошибка';
}