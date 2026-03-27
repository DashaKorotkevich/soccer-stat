/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Расширяем типы для import.meta.env
interface ImportMetaEnv {
  readonly VITE_FOOTBALL_API_KEY: string;
  readonly VITE_FOOTBALL_API_URL: string;
  // Vite добавляет эти переменные автоматически
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
