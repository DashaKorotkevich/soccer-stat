// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import LeaguesPage from '@pages/LeaguesPage/LeaguesPage';
import LeagueMatchesPage from '@pages/LeagueMatchesPage/LeagueMatchesPage';
import TeamsPage from '@pages/TeamsPage/TeamsPage';
import TeamMatchesPage from '@pages/TeamMatchesPage/TeamMatchesPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LeaguesPage />} />
      <Route path="/matches/league/:leagueId" element={<LeagueMatchesPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/matches/team/:teamId" element={<TeamMatchesPage />} />
      <Route path="*" element={<LeaguesPage />} />
    </Routes>
  );
};
