import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Будь ласка, заповніть усі поля');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await login(email, password);
      const from = location.state?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Невірний email або пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBadge}>
        <span>+</span> IndieHub
      </div>

      <div className={styles.card}>
        <span className={styles.subBadge}>З ПОВЕРНЕННЯМ</span>
        <h1 className={styles.title}>Вхід до акаунта</h1>
        <p className={styles.subtitle}>Увійдіть, щоб продовжити роботу в IndieHub.</p>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <div className={styles.demoAlert}>
          💡 Демо-дані: <b>test@example.com</b> / <b>password123</b>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Електронна пошта</label>
            <input
              type="email"
              placeholder="name@example.com"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Пароль</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Введіть пароль"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Вхід...' : 'Увійти ➔'}
          </button>
        </form>

        <p className={styles.footerText}>
          Ще немає акаунта? <Link to="/register" className={styles.link}>Зареєструватися</Link>
        </p>
      </div>

      <p className={styles.bottomCaption}>Просто почати. Легко продовжувати.</p>
    </div>
  );
};

export default Login;