
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <span>+</span> IndieHub
      </a>
      <nav className={styles.nav}>
        <a href="/" className={styles.link}>Головна</a>
        <a href="/developers" className={styles.link}>Знайти учасників</a>
        <a href="/teams" className={styles.link}>Мої команди</a>
      </nav>
      <div className={styles.userBlock}>
        <a href="/create-team" className={styles.createBtn}>+ Створити команду</a>
        <div className={styles.avatar}>👤</div>
      </div>
    </header>
  );
};

export default Header;