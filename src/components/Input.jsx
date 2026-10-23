
import styles from './Input.module.css';

export const Input = ({ label, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        readOnly
      />
    </div>
  );
};

export default Input;