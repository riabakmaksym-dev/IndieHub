
import styles from './TeamMember.module.css';

export const TeamMember = ({
  name = 'Максим Рябак',
  role = 'Тімлід / C# Розробник',
  initials = 'МР',
  isOwner = true
}) => {
  return (
    <div className={styles.memberCard}>
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.info}>
        <h4 className={styles.name}>{name}</h4>
        <div className={styles.role}>{role}</div>
      </div>
      {isOwner && <span className={styles.status}>Керівник</span>}
    </div>
  );
};

export default TeamMember;