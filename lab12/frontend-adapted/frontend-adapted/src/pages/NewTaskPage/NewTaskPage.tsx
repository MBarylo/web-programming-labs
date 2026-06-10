import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { TaskPriority } from '../../types/task';
import { createTask } from '../../api/tasks';
import styles from './NewTaskPage.module.css';

export default function NewTaskPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (title.trim().length < 3) {
      setError('Назва має містити щонайменше 3 символи');
      return;
    }

    setSubmitting(true);
    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        status: 'todo',
        priority,
      });
      navigate('/tasks');
    } catch {
      setError('Не вдалося створити задачу. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 Нова задача</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="title">Назва *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введіть назву задачі"
          />
          {error && <span className={styles.error}>{error}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Опис</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Додатковий опис (необов'язково)"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="priority">Пріоритет</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="low">🟢 Низький</option>
            <option value="medium">🟡 Середній</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? 'Збереження...' : '✅ Створити задачу'}
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate('/tasks')}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}
