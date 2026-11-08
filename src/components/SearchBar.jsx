import styles from './SearchBar.module.css';

export const SearchBar = ({
  placeholder = 'Пошук за назвою команди або грою...',
  value = '',
  onChange,
  onSearch
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Знайти
      </button>
    </form>
  );
};

export default SearchBar;