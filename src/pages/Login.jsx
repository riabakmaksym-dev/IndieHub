
import styles from './Login.module.css';

export const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.topBadge}>
        <span>+</span> IndieHub
      </div>

      <div className={styles.card}>
        <span className={styles.subBadge}>З ПОВЕРНЕННЯМ</span>
        <h1 className={styles.title}>Вхід до акаунта</h1>
        <p className={styles.subtitle}>Увійдіть, щоб продовжити роботу в IndieHub.</p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label className={styles.label}>Електронна пошта</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className={styles.input} 
              readOnly 
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Пароль</label>
            <div className={styles.inputWrapper}>
              <input 
                type="password" 
                placeholder="Введіть пароль" 
                className={styles.input} 
                readOnly 
              />
              <span className={styles.eyeIcon}>👁</span>
            </div>
          </div>

          <button type="button" className={styles.submitBtn}>
            Увійти ➔
          </button>
        </form>

        <p className={styles.footerText}>
          Ще немає акаунта? <a href="/register" className={styles.link}>Зареєструватися</a>
        </p>
      </div>

      <p className={styles.bottomCaption}>Просто почати. Легко продовжувати.</p>
    </div>
  );
};

export default Login;