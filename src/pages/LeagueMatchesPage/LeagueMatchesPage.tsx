import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLeagueMatches, getLeagueMatchesWithDates } from '@api/matchesLeague';
import MatchRow from '@components/MatchRow/MatchRow';
import Pagination from '@components/Pagination/Pagination';
import DateRangeFilter from '@components/DateRangeFilter/DateRangeFilter';
import { useItemsPerPage } from '@hooks/useItemsPerPage';
import { usePagination } from '@hooks/usePagination';
import { Match } from '@/types';
import styles from './LeagueMatchesPage.module.css';

const LeagueMatchesPage = () => {
  const { leagueId } = useParams();
  const location = useLocation();
  const [leagueName, setLeagueName] = useState<string>('');
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
        data = await getLeagueMatchesWithDates(Number(leagueId), dateFrom, dateTo);
      } else {
        data = await getLeagueMatches(Number(leagueId));
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
    const name = location.state?.leagueName;
    if (name) {
      setLeagueName(name);
    }

    if (leagueId) {
      fetchMatches();
    }
  }, [leagueId]);

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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default LeagueMatchesPage;
