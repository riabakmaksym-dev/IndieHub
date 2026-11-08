import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import { usePost } from '../hooks/usePost';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import styles from './CreateTeam.module.css';

const AVAILABLE_ROLES = [
  'Програміст',
  '2D-художник',
  '3D-художник',
  'Геймдизайнер',
  'Саунд-дизайнер'
];

export const CreateTeam = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [engine, setEngine] = useState('');
  const [description, setDescription] = useState('');
  const [communicationUrl, setCommunicationUrl] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(['Програміст']);
  const [formError, setFormError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();
  const { execute: createTeam, loading } = usePost(api.createTeam);

  const toggleRole = (role) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== role));
      }
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !genre || !engine) {
      setFormError('Будь ласка, заповніть усі обовʼязкові поля (*)');
      return;
    }

    setFormError('');
    const newTeamPayload = {
      title,
      genre,
      engine,
      category: `${genre.toUpperCase()} • ${engine.toUpperCase()}`,
      description: description || 'Створення нової гри.',
      rolesNeeded: selectedRoles,
      neededRole: selectedRoles[0],
      communicationUrl,
      authorName: user?.username || 'Тімлід',
      ownerId: user?.id
    };

    const result = await createTeam(newTeamPayload);
    if (result.success) {
      navigate('/teams');
    } else {
      setFormError(result.error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Створити команду</h1>
        <p className={styles.subtitle}>Заповніть інформацію про проєкт та знайдіть учасників.</p>

        {formError && <div className={styles.errorAlert}>{formError}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Назва команди *"
            placeholder="Назва команди або гри..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Жанр гри *</label>
              <select
                className={styles.select}
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">Оберіть жанр</option>
                <option value="Пригоди">Пригоди</option>
                <option value="RPG">RPG</option>
                <option value="Екшн">Екшн</option>
                <option value="Стратегія">Стратегія</option>
                <option value="Головоломка">Головоломка</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Ігровий рушій *</label>
              <select
                className={styles.select}
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                required
              >
                <option value="">Оберіть рушій</option>
                <option value="Unity">Unity</option>
                <option value="Godot">Godot</option>
                <option value="Unreal Engine">Unreal Engine</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          <div className={styles.textareaField}>
            <label className={styles.label}>Опис проєкту</label>
            <textarea
              className={styles.textarea}
              placeholder="Коротко розкажіть про ідею гри, сюжет або механіки..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className={styles.label}>Необхідні ролі *</label>
            <div className={styles.rolesGrid}>
              {AVAILABLE_ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`${styles.roleBtn} ${
                    selectedRoles.includes(role) ? styles.roleBtnActive : ''
                  }`}
                >
                  {role} {selectedRoles.includes(role) ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Посилання на канал спілкування"
            placeholder="https://t.me/... або Discord"
            value={communicationUrl}
            onChange={(e) => setCommunicationUrl(e.target.value)}
          />

          <div className={styles.actions}>
            <Link to="/" className={styles.cancelLink}>
              Скасувати
            </Link>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Створення...' : 'Створити команду'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;