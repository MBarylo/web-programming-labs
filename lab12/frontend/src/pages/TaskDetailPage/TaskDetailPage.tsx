import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Task, TaskStatus } from '../../types/task';
import { fetchTask, updateTask, deleteTask } from '../../api/tasks';
import styles from './TaskDetailPage.module.css';

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchTask(Number(id))
      .then(setTask)
      .catch(() => setError('Задачу не знайдено'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!task) return;
    const updated = await updateTask(task.id, { status: e.target.value as TaskStatus });
    setTask(updated);
  };

  const handleDelete = async () => {
    if (!task) return;
    await deleteTask(task.id);
    navigate('/tasks');
  };

  if (loading) return <p>Завантаження...</p>;

  if (error || !task) {
    return (
      <div className={styles.notFound}>
        <p>❌ Задачу не знайдено.</p>
        <Link to="/tasks">← Назад до списку</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/tasks" className={styles.back}>
        ← Назад до списку
      </Link>

      <div className={styles.card}>
        <h2 className={styles.title}>{task.title}</h2>

        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}

        <div className={styles.meta}>
          <div>
            <label>Пріоритет: </label>
            {task.priority === 'high'
              ? '🔴 Високий'
              : task.priority === 'medium'
                ? '🟡 Середній'
                : '🟢 Низький'}
          </div>

          <div>
            <label>Статус: </label>
            <select
              className={styles.select}
              value={task.status}
              onChange={handleStatusChange}
            >
              <option value="todo">📌 Очікує</option>
              <option value="in_progress">⚙️ В роботі</option>
              <option value="done">✅ Виконано</option>
            </select>
          </div>

          <div>
            <label>Створено: </label>
            {new Date(task.createdAt).toLocaleDateString('uk-UA')}
          </div>
        </div>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          🗑️ Видалити задачу
        </button>
      </div>
    </div>
  );
}
