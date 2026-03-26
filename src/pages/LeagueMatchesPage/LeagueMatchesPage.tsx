// src/pages/LeagueMatchesPage.tsx
import { useParams } from 'react-router-dom';

const LeagueMatchesPage = () => {
  const { leagueId } = useParams();
  return (
    <div className="container">
      <p>Страница: матчи лиги (ID: {leagueId})</p>
    </div>
  );
};

export default LeagueMatchesPage;
