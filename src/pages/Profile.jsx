import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './Profile.module.css';

export const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [bio, setBio] = useState(user?.bio || '');
  const [role, setRole] = useState(user?.role || 'Програміст');
  const [skills, setSkills] = useState(user?.skills || ['Розробка', 'Unity']);
  const [newSkill, setNewSkill] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile({ bio, role, skills });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch {
      alert('Помилка при збереженні профілю');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBadge}>+ IndieHub</div>

      <div className={styles.card}>
        <span className={styles.badge}>ВАШ ПРОФІЛЬ</span>
        <h1 className={styles.title}>Налаштування профілю</h1>
        <p className={styles.subtitle}>Розкажіть спільноті трохи про себе, {user?.username}.</p>

        {isSaved && (
          <div className={styles.successAlert}>
            ✓ Профіль успішно оновлено!
          </div>
        )}

        <div className={styles.avatarSection}>
          <div className={styles.avatarCircle}>
            {user?.username ? user.username.slice(0, 2).toUpperCase() : '👤'}
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Про себе</label>
            <textarea
              className={styles.textarea}
              placeholder="Розкажіть про свій досвід, інтереси та ідеї..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
            <label className={styles.label}>Навички</label>
            <div className={styles.skillsContainer}>
              {skills.map((s) => (
                <span
                  key={s}
                  className={styles.skillPill}
                  onClick={() => handleRemoveSkill(s)}
                  title="Натисніть для видалення"
                >
                  {s} ✕
                </span>
              ))}
            </div>

            <div className={styles.skillAddRow}>
              <input
                type="text"
                placeholder="Нова навичка..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className={styles.skillInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <button
                type="button"
                className={styles.addBtn}
                onClick={handleAddSkill}
              >
                + Додати
              </button>
            </div>
          </div>

          <div>
            <label className={styles.label}>Основна роль</label>
            <select
              className={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Програміст">Програміст</option>
              <option value="2D-художник">2D-художник</option>
              <option value="3D-художник">3D-художник</option>
              <option value="Геймдизайнер">Геймдизайнер</option>
              <option value="Саунд-дизайнер">Саунд-дизайнер</option>
              <option value="Тестувальник">Тестувальник</option>
            </select>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Збереження...' : 'Зберегти профіль'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;