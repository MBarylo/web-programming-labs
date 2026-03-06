import { useState } from 'react';
import TaskList from './components/TaskList/TaskList';
import type { Task } from './types/task';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Тестова задача 1',
    description: 'Перевірка TaskList',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Тестова задача 2',
    description: '',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(),
  },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDelete = (id: string) => {
    console.log('delete', id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    console.log('status', id, status);
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return (
    <TaskList
      tasks={tasks}
      onDelete={handleDelete}
      onStatusChange={handleStatusChange}
    />
  );
}

export default App;
