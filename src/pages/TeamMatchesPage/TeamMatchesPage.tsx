// src/pages/TeamMatchesPage.tsx
import { useParams } from 'react-router-dom';

const TeamMatchesPage = () => {
  const { teamId } = useParams();
  return <p>Страница: матчи команды (ID: {teamId})</p>;
};

export default TeamMatchesPage;
