import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Layout from './components/Layout/Layout';
import TasksPage from './pages/TasksPage/TasksPage';
import TaskDetailPage from './pages/TaskDetailPage/TaskDetailPage';
import NewTaskPage from './pages/NewTaskPage/NewTaskPage';
import { INITIAL_TASKS } from './data/initialTasks';
import type { Task } from './types/task';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />

          <Route
            path="tasks"
            element={<TasksPage tasks={tasks} onDelete={deleteTask} />}
          />

          <Route path="tasks/new" element={<NewTaskPage onAdd={addTask} />} />

          <Route
            path="tasks/:id"
            element={
              <TaskDetailPage
                tasks={tasks}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
