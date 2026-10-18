import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import TeamCard from '../components/TeamCard';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroBadge}>СПІЛЬНОТА ІНДІ-РОЗРОБНИКІВ</span>
        <h1 className={styles.title}>Знайдіть команду.<br />Створюйте разом.</h1>
        <p className={styles.subtitle}>
          Ідеї стають іграми, коли поруч правильні люди. Знайдіть команду або зберіть свою.
        </p>
        <div className={styles.searchCenter}>
          <SearchBar placeholder="Пошук за назвою команди або грою..." />
        </div>
      </section>

      <main className={styles.container}>
        <div className={styles.filterWrapper}>
          <FilterPanel />
        </div>

        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.badgeHeader}>ВІДКРИВАЙТЕ НОВЕ</span>
            <h2 className={styles.sectionTitle}>Команди, що шукають своїх</h2>
          </div>
        </div>

        <div className={styles.grid}>
          <TeamCard 
            title="Echoes of Aether"
            category="ПРИГОДИ • UNITY"
            description="Атмосферна пригода про забуті світи, дослідження та вибір, який змінює історію."
            neededRole="2D-художник"
            membersCount={4}
            status="Розробка"
          />
          <TeamCard 
            title="Pixel Nomads"
            category="RPG • GODOT"
            description="Піксельна RPG про маленьку команду мандрівників у великому невідомому світі."
            neededRole="Програміст"
            membersCount={3}
            status="Ідея"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;