import styles from './FilterPanel.module.css';

export const FilterPanel = ({ filters = {}, onChange, onReset }) => {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange({ ...filters, [field]: value });
    }
  };

  return (
    <div className={styles.panel}>
      <span className={styles.label}>Фільтри:</span>

      <select
        className={styles.select}
        value={filters.genre || ''}
        onChange={(e) => handleChange('genre', e.target.value)}
      >
        <option value="">Усі жанри</option>
        <option value="Пригоди">Пригоди</option>
        <option value="RPG">RPG</option>
        <option value="Екшн">Екшн</option>
        <option value="Стратегія">Стратегія</option>
        <option value="Головоломка">Головоломка</option>
      </select>

      <select
        className={styles.select}
        value={filters.engine || ''}
        onChange={(e) => handleChange('engine', e.target.value)}
      >
        <option value="">Ігровий рушій</option>
        <option value="Unity">Unity</option>
        <option value="Godot">Godot</option>
        <option value="Unreal Engine">Unreal Engine</option>
        <option value="Custom">Custom</option>
      </select>

      <select
        className={styles.select}
        value={filters.role || ''}
        onChange={(e) => handleChange('role', e.target.value)}
      >
        <option value="">Необхідна роль</option>
        <option value="Програміст">Програміст</option>
        <option value="2D-художник">2D-художник</option>
        <option value="3D-художник">3D-художник</option>
        <option value="Геймдизайнер">Геймдизайнер</option>
        <option value="Саунд-дизайнер">Саунд-дизайнер</option>
      </select>

      <select
        className={styles.select}
        value={filters.status || ''}
        onChange={(e) => handleChange('status', e.target.value)}
      >
        <option value="">Статус розробки</option>
        <option value="Ідея">Ідея</option>
        <option value="Розробка">Розробка</option>
        <option value="Набір">Набір</option>
        <option value="Реліз">Реліз</option>
      </select>

      <button type="button" className={styles.resetBtn} onClick={onReset}>
        Скинути фільтри
      </button>
    </div>
  );
};

export default FilterPanel;