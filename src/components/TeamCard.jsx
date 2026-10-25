
import styles from './TeamCard.module.css';

export const TeamCard = ({
  title = 'Echoes of Aether',
  category = 'ПРИГОДИ • UNITY',
  description = 'Атмосферна пригода про забуті світи, дослідження та вибір, який змінює історію.',
  neededRole = '2D-художник',
  membersCount = 4,
  status = 'Розробка'
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <span className={styles.statusBadge}>{status}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.seekingSection}>
          <div className={styles.seekingLabel}>Шукаємо в команду:</div>
          <span className={styles.roleTag}>{neededRole}</span>
        </div>

        <div className={styles.footer}>
          <span>{membersCount} учасників</span>
          <a href="/team-details" className={styles.detailsLink}>Детальніше ➔</a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;