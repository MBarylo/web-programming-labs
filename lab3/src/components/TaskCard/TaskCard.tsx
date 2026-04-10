import styles from './TaskCard.module.css';
import clsx from 'clsx';
import type { Task, TaskStatus } from '../../types/task';

type TaskCardProps = {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
};

function formatDate(date: Date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  const priorityClass = {
    low: styles.cardLow,
    medium: styles.cardMedium,
    high: styles.cardHigh,
  }[task.priority];

  return (
    <div className={clsx(styles.card, priorityClass)}>
      <h3 className={styles.title}>{task.title}</h3>

      {task.description && <p>{task.description}</p>}

      <div className={styles.meta}>
        <span>Пріоритет: {task.priority}</span>
        <span>Дата: {formatDate(task.createdAt)}</span>
      </div>

      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={() => onDelete(task.id)}>Видалити</button>
      </div>
    </div>
  );
}

export default TaskCard;
