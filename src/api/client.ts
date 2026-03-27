// src/api/client.ts
import axios, { AxiosError } from 'axios';

// В разработке используем прокси, в продакшене - напрямую
const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? '/api' : (import.meta.env.VITE_FOOTBALL_API_URL || 'https://api.football-data.org/v4');

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления API ключа
apiClient.interceptors.request.use((config) => {
  const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
  if (API_KEY) {
    config.headers['X-Auth-Token'] = API_KEY;
  }
  return config;
});

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log('api: ',error.response?.status);
    console.log('api: ',error.response?.data);
    if (error.response?.status === 429) {
        console.error('Превышен лимит запросов');
    }
    if (error.response?.status === 403) {
        console.error('Неверный API ключ');
    }   
    return Promise.reject(error);
  }
);

// Утилита для ошибок
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'Ошибка API';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Неизвестная ошибка';
}