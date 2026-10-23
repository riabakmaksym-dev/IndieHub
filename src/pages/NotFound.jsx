
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Сторінку не знайдено</p>
      <a href="/" className={styles.link}>Повернутися на головну ➔</a>
    </div>
  );
};

export default NotFound;