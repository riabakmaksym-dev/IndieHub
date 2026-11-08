import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Header.module.css';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        {isAuthenticated ? (
          <>
            <Link to="/create-team" className={styles.createBtn}>
              + Створити команду
            </Link>
            <Link to="/profile" className={styles.avatar} title={user?.username || 'Профіль'}>
              {user?.username ? user.username.slice(0, 2).toUpperCase() : '👤'}
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Вийти
            </button>
          </>
        ) : (
          <div className={styles.guestBlock}>
            <Link to="/login" className={styles.link}>
              Увійти
            </Link>
            <Link to="/register" className={styles.createBtn}>
              Реєстрація
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;