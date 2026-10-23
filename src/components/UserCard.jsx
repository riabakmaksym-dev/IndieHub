
import styles from './UserCard.module.css';

export const UserCard = ({
  initials = 'PD',
  username = '@pixel_dev',
  role = 'Учасник спільноти',
  projects = 4,
  roles = ['Програміст', 'Геймдизайнер'],
  skills = ['Unity', 'C#', 'Godot'],
  rating = 87
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.userInfo}>
          <h4 className={styles.username}>{username}</h4>
          <div className={styles.roleSub}>{role}</div>
        </div>
        <div className={styles.projectsCount}>
          <div>{projects}</div>
          <small>проєктів</small>
        </div>
      </div>

      <div className={styles.tags}>
        {roles.map((r, i) => (
          <span key={i} className={styles.tag}>{r}</span>
        ))}
      </div>

      <div className={styles.tags}>
        {skills.map((s, i) => (
          <span key={i} className={styles.skillTag}>{s}</span>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.rating}>Репутація: <span className={styles.ratingVal}>{rating}</span></div>
        <button className={styles.inviteBtn}>Запросити</button>
      </div>
    </div>
  );
};

export default UserCard;