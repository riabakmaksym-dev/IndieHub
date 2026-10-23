
import styles from './Button.module.css';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;