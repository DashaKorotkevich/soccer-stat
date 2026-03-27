// src/types.ts

// ========== ОБЛАСТЬ/СТРАНА ==========
export interface Area {
  id: number;
  name: string;
  code: string;
  flag?: string | null;
}

// ========== ТЕКУЩИЙ СЕЗОН ==========
export interface CurrentSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: unknown | null;
}

// ========== ЛИГА ==========
export interface League {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem?: string;
  plan?: string;
  area: Area;
  currentSeason?: CurrentSeason;
  numberOfAvailableSeasons?: number;
  lastUpdated?: string;
}

// ========== КОМАНДА (для матчей, краткая) ==========
export interface SimpleTeam {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest?: string;
}

// ========== СЧЁТ ==========
export interface Score {
  winner: string | null;
  duration: string;
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
}

// ========== МАТЧ ==========
export interface Match {
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group: string | null;
  homeTeam: SimpleTeam;
  awayTeam: SimpleTeam;
  score: Score;
  venue?: string;
}

// ========== КОМАНДА (полная, для списка) ==========
export interface Team {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest: string;
  address?: string;
  website?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  area?: Area;  // добавляем area, чтобы показывать страну
  lastUpdated?: string;
}