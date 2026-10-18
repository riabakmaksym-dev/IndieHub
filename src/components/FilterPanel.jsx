import React from 'react';
import styles from './FilterPanel.module.css';

export const FilterPanel = () => {
  return (
    <div className={styles.panel}>
      <span className={styles.label}>Фільтри:</span>
      <select className={styles.select}>
        <option>Усі жанри</option>
      </select>
      <select className={styles.select}>
        <option>Ігровий рушій</option>
      </select>
      <select className={styles.select}>
        <option>Необхідна роль</option>
      </select>
      <select className={styles.select}>
        <option>Статус розробки</option>
      </select>
      <button type="button" className={styles.resetBtn}>
        Скинути фільтри
      </button>
    </div>
  );
};

export default FilterPanel;