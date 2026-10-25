
import TeamCard from '../components/TeamCard';
import styles from './Teams.module.css';

export const Teams = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Мої команди</h1>
      <div className={styles.grid}>
        <TeamCard title="Echoes of Aether" category="ПРИГОДИ • UNITY" neededRole="2D-художник" membersCount={4} status="Розробка" />
        <TeamCard title="Pixel Nomads" category="RPG • GODOT" neededRole="Програміст" membersCount={3} status="Ідея" />
      </div>
    </div>
  );
};

export default Teams;