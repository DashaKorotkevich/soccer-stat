import styles from './TeamsPage.module.css';
import { Card } from '@components/Card/Card';
import Pagination from '@components/Pagination/Pagination';
import SearchInput from '@components/SearchInput/SearchInput';
import { useState } from 'react';
import { useItemsPerPage } from '@hooks/useItemsPerPage';
import { usePagination } from '@hooks/usePagination';
import { useTeams } from '@hooks/useTeams';
import { useNavigate } from 'react-router-dom';

const TeamsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: teams = [], isLoading, isError, error } = useTeams();
  const itemsPerPage = useItemsPerPage('CARDS');

  const { currentPage, totalPages, currentItems, setCurrentPage, totalItems } = usePagination(
    teams,
    itemsPerPage,
    searchQuery
  );

  const handleCardClick = (id: number, name: string) => {
    navigate(`/matches/team/${id}`, { state: { teamName: name } });
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className={styles.loading}>
          <p>Загрузка команд...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container">
        <div className={styles.error}>
          <p>{error instanceof Error ? error.message : 'Ошибка загрузки команд'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Поиск команд по названию..."
      />

      {searchQuery && <div className={styles.searchInfo}>Найдено: {totalItems} команд</div>}

      {currentItems.length === 0 ? (
        <div className={styles.empty}>
          <p>Команды не найдены</p>
          {searchQuery && <button onClick={() => setSearchQuery('')}>Очистить поиск</button>}
        </div>
      ) : (
        <>
          <div className={styles.cardsContainer}>
            {currentItems.map((team) => (
              <Card
                key={team.id}
                id={team.id}
                name={team.name}
                imageUrl={team.crest}
                onClick={() => handleCardClick(team.id, team.name)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default TeamsPage;
