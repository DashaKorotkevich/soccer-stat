import { useParams, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import MatchRow from '@components/MatchRow/MatchRow';
import Pagination from '@components/Pagination/Pagination';
import DateRangeFilter from '@components/DateRangeFilter/DateRangeFilter';
import { useItemsPerPage } from '@hooks/useItemsPerPage';
import { usePagination } from '@hooks/usePagination';
import { useLeagueMatches } from '@hooks/useLeagueMatches';
import { Match } from '@/types';
import styles from './LeagueMatchesPage.module.css';

const LeagueMatchesPage = () => {
  const { leagueId = '' } = useParams<{ leagueId: string }>();
  const location = useLocation();
  const leagueName = location.state?.leagueName || '';
  const [dateRange, setDateRange] = useState<{ dateFrom?: string; dateTo?: string }>({});

  const {
    data: allMatches = [],
    isLoading,
    isError,
    error,
  } = useLeagueMatches(leagueId, dateRange.dateFrom, dateRange.dateTo);
  const itemsPerPage = useItemsPerPage('LIST');
  const { currentPage, totalPages, currentItems, setCurrentPage } = usePagination<Match>(
    allMatches,
    itemsPerPage,
    ''
  );

  const handleFilter = (dateFrom: string, dateTo: string) => {
    setDateRange({ dateFrom, dateTo });
    setCurrentPage(1); // Сбрасываем пагинацию на 1 страницу
  };

  const handleClearFilter = () => {
    setDateRange({});
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className={styles.loading}>Загрузка матчей...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container">
        <div className={styles.error}>
          {error instanceof Error ? error.message : 'Ошибка загрузки матчей'}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <Link to="/" className={styles.breadcrumbLink}>
          Лиги
        </Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>{leagueName}</span>
      </div>

      <DateRangeFilter onFilter={handleFilter} onClear={handleClearFilter} />

      <div className={styles.matchesList}>
        {currentItems.length === 0 ? (
          <div className={styles.empty}>Матчей не найдено</div>
        ) : (
          currentItems.map((match) => <MatchRow key={match.id} match={match} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default LeagueMatchesPage;
