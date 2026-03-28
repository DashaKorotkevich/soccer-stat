import { useState } from 'react';
import styles from './DateRangeFilter.module.css';

interface DateRangeFilterProps {
  onFilter: (dateFrom: string, dateTo: string) => void;
  onClear: () => void;
}

const DateRangeFilter = ({ onFilter, onClear }: DateRangeFilterProps) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Date from changed:', value);
    setDateFrom(value);

    if (value && dateTo) {
      console.log('Both dates have values, filtering...');
      onFilter(value, dateTo);
    } else if (!value && !dateTo) {
      console.log('Both dates empty, clearing...');
      onClear();
    }
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Date to changed:', value);
    setDateTo(value);

    if (dateFrom && value) {
      console.log('Both dates have values, filtering...');
      onFilter(dateFrom, value);
    } else if (!dateFrom && !value) {
      console.log('Both dates empty, clearing...');
      onClear();
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterRow}>
        <div className={styles.dateField}>
          <label>Дата с:</label>
          <input type="date" value={dateFrom} onChange={handleDateFromChange} />
        </div>

        <div className={styles.dateField}>
          <label>Дата по:</label>
          <input type="date" value={dateTo} onChange={handleDateToChange} />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
