import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTeamMatches, getTeamMatchesWithDates } from '@api/matchesTeam';
import MatchRow from '@components/MatchRow/MatchRow';
import Pagination from '@components/Pagination/Pagination';
import DateRangeFilter from '@components/DateRangeFilter/DateRangeFilter';
import { useItemsPerPage } from '@hooks/useItemsPerPage';
import { usePagination } from '@hooks/usePagination';
import { Match } from '@/types';
import styles from './TeamMatchesPage.module.css';

const TeamMatchesPage = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const [teamName, setTeamName] = useState<string>('');
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = useItemsPerPage('LIST');

  const { currentPage, totalPages, currentItems, setCurrentPage } = usePagination(
    allMatches,
    itemsPerPage,
    ''
  );

  const fetchMatches = async (dateFrom?: string, dateTo?: string) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (dateFrom && dateTo) {
        data = await getTeamMatchesWithDates(Number(teamId), dateFrom, dateTo);
      } else {
        data = await getTeamMatches(Number(teamId));
      }

      setAllMatches(data);
      setCurrentPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки матчей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const name = location.state?.teamName;
    if (name) {
      setTeamName(name);
    }

    if (teamId) {
      fetchMatches();
    }
  }, [teamId]);

  const handleFilter = (dateFrom: string, dateTo: string) => {
    fetchMatches(dateFrom, dateTo);
  };

  const handleClearFilter = () => {
    fetchMatches();
  };

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loading}>Загрузка матчей...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className={styles.error}>{error}</div>
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default TeamMatchesPage;
