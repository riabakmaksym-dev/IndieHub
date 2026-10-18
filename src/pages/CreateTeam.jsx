import React from 'react';
import Input from '../components/Input';
import styles from './CreateTeam.module.css';

export const CreateTeam = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Створити команду</h1>
        <p className={styles.subtitle}>Заповніть інформацію про проєкт та знайдіть учасників.</p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input label="Назва команди *" placeholder="Назва команди або гри..." />

          <div>
            <label className={styles.label}>Логотип</label>
            <div className={styles.dropzone}>
              📤 Завантажити логотип
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Жанр гри *</label>
              <select className={styles.select}><option>Оберіть жанр</option></select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Ігровий рушій *</label>
              <select className={styles.select}><option>Оберіть рушій</option></select>
            </div>
          </div>

          <div>
            <label className={styles.label}>Необхідні ролі *</label>
            <div className={styles.rolesGrid}>
              <button type="button" className={`${styles.roleBtn} ${styles.roleBtnActive}`}>Програміст</button>
              <button type="button" className={styles.roleBtn}>2D-художник</button>
              <button type="button" className={styles.roleBtn}>3D-художник</button>
              <button type="button" className={styles.roleBtn}>Геймдизайнер</button>
              <button type="button" className={styles.roleBtn}>Саунд-дизайнер</button>
            </div>
          </div>

          <Input label="Посилання на канал спілкування" placeholder="https://t.me/..." />

          <div className={styles.actions}>
            <a href="/" className={styles.cancelLink}>Скасувати</a>
            <button type="button" className={styles.submitBtn}>
              Створити команду
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;