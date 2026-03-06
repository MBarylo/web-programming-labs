import { useState } from 'react';
import TaskCard from './components/TaskCard/TaskCard';
import type { Task } from './types/task';

const mockTask: Task = {
  id: '1',
  title: 'Тестова задача',
  description: 'Перевірка відображення картки',
  status: 'todo',
  priority: 'high',
  createdAt: new Date(),
};

function App() {
  const [task, setTask] = useState(mockTask);

  return (
    <TaskCard
      task={task}
      onDelete={(id) => console.log('delete', id)}
      onStatusChange={(id, status) => {
        console.log('status callback', id, status);
        setTask({ ...task, status }); // оновлюємо статус, React перерендерить select
        console.log('status', id, status); // тепер буде лог
      }}
    />
  );
}

export default App;
