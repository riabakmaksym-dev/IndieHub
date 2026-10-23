
import styles from './Profile.module.css';

export const Profile = () => {
  return (
    <div className={styles.page}>
      <div className={styles.topBadge}>+ IndieHub</div>

      <div className={styles.card}>
        <span className={styles.badge}>ВАШ ПРОФІЛЬ</span>
        <h1 className={styles.title}>Налаштування профілю</h1>
        <p className={styles.subtitle}>Розкажіть спільноті трохи про себе.</p>

        <div className={styles.avatarSection}>
          <div className={styles.avatarCircle}>👤</div>
          <a href="#upload" className={styles.uploadLink}>Завантажити аватарку</a>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className={styles.label}>Про себе</label>
            <textarea className={styles.textarea} placeholder="Розкажіть про свій досвід, інтереси та ідеї..." readOnly />
          </div>

          <div>
            <label className={styles.label}>Навички</label>
            <div className={styles.skillsContainer}>
              <span className={styles.skillPill}>Програмування ✕</span>
              <span className={styles.skillPill}>Unity ✕</span>
              <button type="button" className={styles.addBtn}>+ Додати</button>
            </div>
          </div>

          <div>
            <label className={styles.label}>Основна роль</label>
            <select className={styles.select}>
              <option>Програміст</option>
              <option>2D-художник</option>
              <option>3D-художник</option>
              <option>Геймдизайнер</option>
            </select>
          </div>

          <div>
            <label className={styles.label}>Додаткові ролі</label>
            <select className={styles.select}>
              <option>Оберіть додаткові ролі</option>
            </select>
          </div>

          <button type="button" className={styles.submitBtn}>
            Зберегти профіль
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;