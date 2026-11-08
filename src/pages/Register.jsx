import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import styles from './Register.module.css';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Заповніть усі поля');
      return;
    }
    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }
    if (password.length < 6) {
      setError('Пароль має містити щонайменше 6 символів');
      return;
    }
    if (!terms) {
      setError('Необхідно погодитися з умовами');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await register({ username, email, password });
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Помилка при реєстрації');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBadge}>+ IndieHub</div>

      <div className={styles.card}>
        <span className={styles.subBadge}>ЛАСКАВО ПРОСИМО</span>
        <h1 className={styles.title}>Форма реєстрації</h1>
        <p className={styles.subtitle}>Створіть свій акаунт — це займе лише хвилину.</p>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Нікнейм"
            placeholder="Як до вас звертатися?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Електронна пошта"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Пароль"
            type="password"
            placeholder="Створіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Підтвердження пароля"
            type="password"
            placeholder="Повторіть пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label htmlFor="terms" className={styles.termsLabel}>
              Погоджуюся з умовами
            </label>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Реєстрація...' : 'Зареєструватися ➔'}
          </button>
        </form>

        <p className={styles.footerText}>
          Вже маєте акаунт? <Link to="/login" className={styles.link}>Увійти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;