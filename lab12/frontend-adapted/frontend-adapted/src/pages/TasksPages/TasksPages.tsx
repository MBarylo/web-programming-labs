import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import TaskCard from '../../components/TaskCard/TaskCard';
import { fetchTasks, deleteTask } from '../../api/tasks';
import type { Task } from '../../types/task';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(() => setError('Не вдалося завантажити задачі'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📋 Задачі ({tasks.length})</h2>
        <Link to="/tasks/new">
          <button>+ Нова задача</button>
        </Link>
      </div>

      {tasks.length === 0 && <p>Задач поки немає. Створіть першу!</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
