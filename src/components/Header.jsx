
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span>+</span> IndieHub
      </Link>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Головна
        </Link>
        <Link to="/developers" className={styles.link}>
          Знайти учасників
        </Link>
        <Link to="/teams" className={styles.link}>
          Мої команди
        </Link>
      </nav>

      <div className={styles.userBlock}>
        <Link to="/create-team" className={styles.createBtn}>
          + Створити команду
        </Link>
        <Link to="/profile" className={styles.avatar}>
          👤
        </Link>
      </div>
    </header>
  );
};

export default Header;
