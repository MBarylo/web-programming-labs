// src/App.tsx
import { useState } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import type { Task, TaskStatus } from './types/task';
import type { TaskFormData } from './components/TaskForm/TaskForm';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Додаємо нову задачу
  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: String(Date.now()), // простий id
      status: 'todo', // статус додаємо тут
      createdAt: new Date(), // дата створення
      ...data, // title, description, priority
    };

    setTasks((prev) => [...prev, newTask]);
    console.log('Додано нову задачу:', newTask);
  };

  // Видалення задачі
  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    console.log('Видалено задачу:', id);
  };

  // Зміна статусу
  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    console.log('Змінено статус:', id, status);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center' }}>Мій список задач</h1>

      <TaskForm onSubmit={handleAddTask} />

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default App;
