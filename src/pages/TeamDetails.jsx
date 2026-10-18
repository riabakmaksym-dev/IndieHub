import React from 'react';
import TeamMember from '../components/TeamMember';
import styles from './TeamDetails.module.css';

export const TeamDetails = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Echoes of Aether</h1>
      <p className={styles.desc}>
        Атмосферна пригода про забуті світи, дослідження та вибір, який змінює історію.
      </p>

      <h3 className={styles.membersHeader}>Учасники команди</h3>
      <div className={styles.membersList}>
        <TeamMember name="Максим Рябак" role="Тімлід / C# Розробник" initials="МР" isOwner={true} />
        <TeamMember name="Олена Петренко" role="2D-художник" initials="ОП" isOwner={false} />
      </div>
    </div>
  );
};

export default TeamDetails;