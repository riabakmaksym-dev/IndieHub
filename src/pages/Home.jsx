import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import TeamCard from '../components/TeamCard';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import styles from './Home.module.css';

export const Home = () => {
  const { data: teams, loading, error } = useFetch(api.getTeams);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    engine: '',
    role: '',
    status: ''
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({ genre: '', engine: '', role: '', status: '' });
  };

  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    return teams.filter((team) => {
      const matchSearch =
        team.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchGenre = !filters.genre || team.genre === filters.genre;
      const matchEngine = !filters.engine || team.engine === filters.engine;
      const matchRole =
        !filters.role ||
        (team.rolesNeeded && team.rolesNeeded.includes(filters.role)) ||
        team.neededRole === filters.role;
      const matchStatus = !filters.status || team.status === filters.status;

      return matchSearch && matchGenre && matchEngine && matchRole && matchStatus;
    });
  }, [teams, searchQuery, filters]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroBadge}>СПІЛЬНОТА ІНДІ-РОЗРОБНИКІВ</span>
        <h1 className={styles.title}>
          Знайдіть команду.<br />Створюйте разом.
        </h1>
        <p className={styles.subtitle}>
          Ідеї стають іграми, коли поруч правильні люди. Знайдіть команду або зберіть свою.
        </p>
        <div className={styles.searchCenter}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Пошук за назвою команди або грою..."
          />
        </div>
      </section>

      <main className={styles.container}>
        <div className={styles.filterWrapper}>
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.badgeHeader}>ВІДКРИВАЙТЕ НОВЕ</span>
            <h2 className={styles.sectionTitle}>Команди, що шукають своїх</h2>
          </div>
        </div>

        {loading && <div className={styles.statusMessage}>Завантаження команд...</div>}
        {error && <div className={styles.errorMessage}>Помилка: {error}</div>}

        {!loading && !error && filteredTeams.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>За вашими критеріями команд не знайдено</p>
            <button onClick={handleResetFilters} className={styles.resetBtn}>
              Скинути фільтри
            </button>
          </div>
        )}

        <div className={styles.grid}>
          {filteredTeams.map((team) => (
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
      </main>
    </div>
  );
};

export default Home;