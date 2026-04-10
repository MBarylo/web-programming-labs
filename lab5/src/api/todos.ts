import axios from 'axios';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const todosApi = {
  async getAll(): Promise<Todo[]> {
    const { data } = await api.get<Todo[]>('/todos');
    return data;
  },

  async create(todo: CreateTodoDto): Promise<Todo> {
    const { data } = await api.post<Todo>('/todos', todo);
    return data;
  },

  async update(id: number, todo: UpdateTodoDto): Promise<Todo> {
    const { data } = await api.patch<Todo>(`/todos/${id}`, todo);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
};
