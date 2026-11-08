import { useState, useMemo } from 'react';
import UserCard from '../components/UserCard';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import styles from './Developers.module.css';

export const Developers = () => {
  const { data: developers, loading, error } = useFetch(api.getDevelopers);

  const [roleFilter, setRoleFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  const filteredDevelopers = useMemo(() => {
    if (!developers) return [];
    return developers.filter((dev) => {
      const matchRole = !roleFilter || dev.roles?.includes(roleFilter) || dev.role === roleFilter;
      const matchSkill = !skillFilter || dev.skills?.includes(skillFilter);
      return matchRole && matchSkill;
    });
  }, [developers, roleFilter, skillFilter]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.badge}>ПОШУК КОМАНДИ</span>
        <h1 className={styles.title}>Знайти учасників</h1>
        <p className={styles.subtitle}>
          Знайдіть спеціалістів з потрібними навичками та запросіть їх до своєї команди.
        </p>
      </div>

      <div className={styles.filtersBar}>
        <select
          className={styles.select}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Усі ролі</option>
          <option value="Програміст">Програміст</option>
          <option value="2D-художник">2D-художник</option>
          <option value="3D-художник">3D-художник</option>
          <option value="Геймдизайнер">Геймдизайнер</option>
          <option value="Саунд-дизайнер">Саунд-дизайнер</option>
          <option value="Тестувальник">Тестувальник</option>
        </select>

        <select
          className={styles.select}
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        >
          <option value="">Усі навички</option>
          <option value="Unity">Unity</option>
          <option value="C#">C#</option>
          <option value="Godot">Godot</option>
          <option value="Unreal">Unreal</option>
          <option value="C++">C++</option>
          <option value="Photoshop">Photoshop</option>
          <option value="Figma">Figma</option>
          <option value="Blender">Blender</option>
        </select>
      </div>

      {loading && <div className={styles.statusMessage}>Завантаження розробників...</div>}
      {error && <div className={styles.errorMessage}>Помилка: {error}</div>}

      <div className={styles.grid}>
        {filteredDevelopers.map((dev) => (
          <UserCard
            key={dev.id}
            initials={dev.initials}
            username={dev.username}
            role={dev.role}
            roles={dev.roles}
            skills={dev.skills}
            rating={dev.rating}
            projects={dev.projects}
          />
        ))}
      </div>
    </div>
  );
};

export default Developers;