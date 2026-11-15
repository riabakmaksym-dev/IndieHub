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
      const from = location.state?.from?.pathname || '/';
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
          <div className={styles.demoTitle}>💡 Тестовий акаунт для перевірки:</div>
          <div className={styles.demoCredentials}>
            <div><strong>Email:</strong> test@example.com</div>
            <div><strong>Пароль:</strong> password123</div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Електронна пошта</label>
            <input
              type="email"
              className={styles.input}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="Введіть пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Авторизація...' : 'Увійти до акаунта ➔'}
          </button>
        </form>

        <p className={styles.footerText}>
          Не маєте акаунта? <Link to="/register" className={styles.link}>Зареєструватися</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
