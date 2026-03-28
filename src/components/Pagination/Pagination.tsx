import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Если всего 1 страница, ничего не показываем
  if (totalPages <= 1) {
    return null;
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={goToPrevPage} disabled={currentPage === 1} className={styles.button}>
        ← Назад
      </button>

      <span className={styles.pageInfo}>
        Страница {currentPage} из {totalPages}
      </span>

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={styles.button}
      >
        Вперед →
      </button>
    </div>
  );
};

export default Pagination;
