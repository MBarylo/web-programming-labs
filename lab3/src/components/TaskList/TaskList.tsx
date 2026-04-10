import TaskCard from '../TaskCard/TaskCard';
import type { Task, TaskStatus } from '../../types/task';
import styles from './TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
};

function TaskList({ tasks, onDelete, onStatusChange }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className={styles.emptyMessage}>Задач немає. Додайте першу задачу!</p>
    );
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
