import type { CreateTaskPayload, Task } from '../types/task';

const BASE_URL = '/api/tasks';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Не вдалося завантажити задачі');
  return res.json();
}

export async function fetchTask(id: number): Promise<Task> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Задачу не знайдено');
  return res.json();
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Не вдалося створити задачу');
  return res.json();
}

export async function updateTask(id: number, payload: Partial<CreateTaskPayload>): Promise<Task> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Не вдалося оновити задачу');
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Не вдалося видалити задачу');
}
