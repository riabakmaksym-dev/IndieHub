import styles from './Input.module.css';

export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  name,
  disabled = false,
  readOnly = false
}) => {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        className={styles.input}
      />
    </div>
  );
};

export default Input;