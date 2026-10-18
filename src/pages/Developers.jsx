import React from 'react';
import UserCard from '../components/UserCard';
import styles from './Developers.module.css';

export const Developers = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.badge}>ПОШУК КОМАНДИ</span>
        <h1 className={styles.title}>Знайти учасників</h1>
        <p className={styles.subtitle}>Знайдіть спеціалістів з потрібними навичками та запросіть їх до своєї команди.</p>
      </div>

      <div className={styles.filtersBar}>
        <select className={styles.select}><option>Усі ролі</option></select>
        <select className={styles.select}><option>Усі навички</option></select>
        <select className={styles.select}><option>Репутація</option></select>
        <select className={styles.select}><option>Доступність</option></select>
      </div>

      <div className={styles.grid}>
        <UserCard initials="PD" username="@pixel_dev" roles={['Програміст', 'Геймдизайнер']} skills={['Unity', 'C#', 'Godot']} rating={87} />
        <UserCard initials="AL" username="@artlena_2d" roles={['2D-художник']} skills={['Aseprite', 'Photoshop', 'Figma']} rating={92} />
        <UserCard initials="VU" username="@vasyl_ue" roles={['Програміст', '3D-художник']} skills={['Unreal', 'C++', 'Blender']} rating={74} />
        <UserCard initials="SC" username="@soundcraft" roles={['Звуковий дизайнер']} skills={['FMOD', 'Audacity', 'Unity']} rating={81} />
        <UserCard initials="QM" username="@qa_mykola" roles={['Тестувальник']} skills={['Unity', 'Python', 'Jira']} rating={68} />
        <UserCard initials="DM" username="@designerMax" roles={['Геймдизайнер']} skills={['Figma', 'Aseprite', 'Photoshop']} rating={95} />
      </div>
    </div>
  );
};

export default Developers;