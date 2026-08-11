import { useParams, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import MatchRow from '@components/MatchRow/MatchRow';
import Pagination from '@components/Pagination/Pagination';
import DateRangeFilter from '@components/DateRangeFilter/DateRangeFilter';
import { useItemsPerPage } from '@hooks/useItemsPerPage';
import { usePagination } from '@hooks/usePagination';
import { useTeamMatches } from '@hooks/useTeamMatches';
import { Match } from '@/types';
import styles from './TeamMatchesPage.module.css';

const TeamMatchesPage = () => {
  const { teamId = '' } = useParams<{ teamId: string }>();
  const location = useLocation();

  const teamName = location.state?.teamName || '';

  const [dateRange, setDateRange] = useState<{ dateFrom?: string; dateTo?: string }>({});

  const {
    data: allMatches = [],
    isLoading,
    isError,
    error,
  } = useTeamMatches(teamId, dateRange.dateFrom, dateRange.dateTo);

  const itemsPerPage = useItemsPerPage('LIST');

  const { currentPage, totalPages, currentItems, setCurrentPage } = usePagination<Match>(
    allMatches,
    itemsPerPage,
    ''
  );

  const handleFilter = (dateFrom: string, dateTo: string) => {
    setDateRange({ dateFrom, dateTo });
    setCurrentPage(1);
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
        <Link to="/teams" className={styles.breadcrumbLink}>
          Команды
        </Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>{teamName}</span>
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

export default TeamMatchesPage;
