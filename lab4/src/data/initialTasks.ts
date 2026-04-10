import type { Task } from '../types/task';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Створити структуру React-проєкту',
    description:
      'Ініціалізувати проєкт та налаштувати папки components, types, data',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Реалізувати компонент TaskList',
    description: 'Створити компонент для відображення списку задач',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Додати форму створення задачі',
    description: 'Реалізувати форму для додавання нової задачі',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Додати фільтр задач за статусом',
    description: 'Реалізувати можливість фільтрації todo / in-progress / done',
    status: 'done',
    priority: 'low',
    createdAt: new Date(),
  },
];
