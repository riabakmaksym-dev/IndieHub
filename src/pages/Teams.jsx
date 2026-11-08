import TeamCard from '../components/TeamCard';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import styles from './Teams.module.css';

export const Teams = () => {
  const { data: teams, loading, error } = useFetch(api.getTeams);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Усі команди</h1>

      {loading && <div className={styles.statusMessage}>Завантаження списку команд...</div>}
      {error && <div className={styles.errorMessage}>Помилка завантаження: {error}</div>}

      <div className={styles.grid}>
        {teams &&
          teams.map((team) => (
            <TeamCard
              key={team.id}
              id={team.id}
              title={team.title}
              category={team.category}
              description={team.description}
              neededRole={team.neededRole}
              membersCount={team.membersCount}
              status={team.status}
            />
          ))}
      </div>
    </div>
  );
};

export default Teams;