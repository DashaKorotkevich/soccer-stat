import { useState } from 'react';
import styles from './DateRangeFilter.module.css';

interface DateRangeFilterProps {
  onFilter: (dateFrom: string, dateTo: string) => void;
  onClear: () => void;
}

const DateRangeFilter = ({ onFilter, onClear }: DateRangeFilterProps) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFromDate = event.target.value;
    setFromDate(nextFromDate);

    if (!nextFromDate) {
      onClear();
      return;
    }

    if (nextFromDate && toDate && nextFromDate <= toDate) {
      onFilter(nextFromDate, toDate);
    }
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextToDate = event.target.value;
    setToDate(nextToDate);

    if (!nextToDate) {
      onClear();
      return;
    }

    if (fromDate && nextToDate && fromDate <= nextToDate) {
      onFilter(fromDate, nextToDate);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterRow}>
        <div className={styles.dateField}>
          <label>Дата с:</label>
          <input type="date" value={fromDate} onChange={handleFromDateChange} />
        </div>

        <div className={styles.dateField}>
          <label>Дата по:</label>
          <input type="date" value={toDate} onChange={handleToDateChange} />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
