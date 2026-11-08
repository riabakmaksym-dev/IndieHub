import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamMember from '../components/TeamMember';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import styles from './TeamDetails.module.css';

export const TeamDetails = () => {
  const { id } = useParams();
  const fetchTeam = useCallback(() => api.getTeamById(id), [id]);
  const { data: team, loading, error } = useFetch(fetchTeam);

  if (loading) {
    return <div className={styles.wrapper}>Завантаження деталей команди...</div>;
  }

  if (error || !team) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.notFound}>
          <h2>Команду не знайдено</h2>
          <Link to="/teams" className={styles.backLink}>
            ← Повернутися до списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerMeta}>
        <span className={styles.categoryBadge}>{team.category}</span>
        <span className={styles.statusBadge}>{team.status}</span>
      </div>

      <h1 className={styles.title}>{team.title}</h1>
      <p className={styles.desc}>{team.description}</p>

      {team.communicationUrl && (
        <div className={styles.contactAction}>
          <a
            href={team.communicationUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.contactBtn}
          >
            💬 Зв'язатися з командою
          </a>
        </div>
      )}

      <h3 className={styles.membersHeader}>Учасники команди ({team.members?.length || 0})</h3>
      <div className={styles.membersList}>
        {team.members &&
          team.members.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              role={member.role}
              initials={member.initials}
              isOwner={member.isOwner}
            />
          ))}
      </div>
    </div>
  );
};

export default TeamDetails;