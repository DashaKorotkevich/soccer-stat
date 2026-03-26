import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          FIFA
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
            Лиги
          </Link>
          <Link
            to="/teams"
            className={`${styles.navLink} ${isActive('/teams') ? styles.active : ''}`}
          >
            Команды
          </Link>
        </nav>
      </div>
    </header>
  );
};
