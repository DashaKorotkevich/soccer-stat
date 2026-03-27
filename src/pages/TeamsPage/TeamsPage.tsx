// src/pages/TeamsPage.tsx
import styles from './TeamsPage.module.css';
import { Card } from '@components/Card/Card';
import Pagination from '@components/Pagination/Pagination';
import SearchInput from '@components/SearchInput/SearchInput';
import { useState, useEffect } from 'react';
import { getTeams } from '@api/teams';
import { Team } from '@/types';
import { useItemsPerPage } from '@hooks/useItemsPerPage';
import { usePagination } from '@hooks/usePagination';
import { useNavigate } from 'react-router-dom';

const TeamsPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Получаем сколько карточек показывать (5, 7 или 9)
  const itemsPerPage = useItemsPerPage();

  // Получаем данные для пагинации
  const {
    currentPage,
    totalPages,
    currentItems,
    setCurrentPage,
    totalItems
  } = usePagination(teams, itemsPerPage, searchQuery);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTeams();
        setTeams(data);
        console.log('Команды загружены:', data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки команд');
        console.error('Ошибка при загрузке команд:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/teams/${id}/matches`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loading}>
          <p>Загрузка команд...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Попробовать снова</button>
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
    
      {searchQuery && (
        <div className={styles.searchInfo}>
          Найдено: {totalItems} команд
        </div>
      )}

      {currentItems.length === 0 ? (
        <div className={styles.empty}>
          <p>Команды не найдены</p>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              Очистить поиск
            </button>
          )}
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
                onClick={handleCardClick}
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