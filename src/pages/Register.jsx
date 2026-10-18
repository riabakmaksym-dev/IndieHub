import React from 'react';
import Input from '../components/Input';
import styles from './Register.module.css';

export const Register = () => {
  return (
    <div className={styles.page}>
      <div className={styles.topBadge}>+ IndieHub</div>

      <div className={styles.card}>
        <span className={styles.subBadge}>ЛАСКАВО ПРОСИМО</span>
        <h1 className={styles.title}>Форма реєстрації</h1>
        <p className={styles.subtitle}>Створіть свій акаунт — це займе лише хвилину.</p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input label="Нікнейм" placeholder="Як до вас звертатися?" />
          <Input label="Електронна пошта" type="email" placeholder="name@example.com" />
          <Input label="Пароль" type="password" placeholder="Створіть пароль" />
          <Input label="Підтвердження пароля" type="password" placeholder="Повторіть пароль" />

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="terms" readOnly checked />
            <label htmlFor="terms">Погоджуюся з умовами</label>
          </div>

          <button type="button" className={styles.submitBtn}>
            Зареєструватися ➔
          </button>
        </form>

        <p className={styles.footerText}>
          Вже маєте акаунт? <a href="/login" className={styles.link}>Увійти</a>
        </p>
      </div>
    </div>
  );
};

export default Register;