
import styles from './SearchBar.module.css';

export const SearchBar = ({ placeholder = 'Пошук за назвою команди або грою...' }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        readOnly
      />
      <button type="button" className={styles.button}>Знайти</button>
    </div>
  );
};

export default SearchBar;