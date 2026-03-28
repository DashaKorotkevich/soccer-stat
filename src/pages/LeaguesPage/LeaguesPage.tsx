import styles from './LeaguesPage.module.css';
import { Card } from '@components/Card/Card';
import Pagination from '@components/Pagination/Pagination';
import { useState, useEffect } from 'react';
import { getLeagues } from '@api/leagues';
import { League } from '@/types';
import { useItemsPerPage } from '@hooks/useItemsPerPage';
import { usePagination } from '@hooks/usePagination';
import SearchInput from '@components/SearchInput/SearchInput';
import { useNavigate } from 'react-router-dom';

const LeaguesPage = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = useItemsPerPage('CARDS');

  // Получаем данные для пагинации
  const { currentPage, totalPages, currentItems, setCurrentPage, totalItems } =
    usePagination<League>(leagues, itemsPerPage, searchQuery);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLeagues();
        setLeagues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки лиг');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const handleCardClick = (id: number, name: string) => {
    navigate(`/matches/league/${id}`, { state: { leagueName: name } });
  };

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loading}>
          <p>Загрузка лиг...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Поиск по названию или стране"
      />

      {searchQuery && <div className={styles.searchInfo}>Найдено: {totalItems} лиг</div>}

      {currentItems.length === 0 ? (
        <div className={styles.empty}>
          <p>Лиги не найдены</p>
          {searchQuery && <button onClick={() => setSearchQuery('')}>Очистить поиск</button>}
        </div>
      ) : (
        <>
          <div className={styles.cardsContainer}>
            {currentItems.map((league) => (
              <Card
                key={league.id}
                id={league.id}
                name={league.name}
                imageUrl={league.emblem}
                country={league.area?.name}
                onClick={() => handleCardClick(league.id, league.name)}
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

export default LeaguesPage;
