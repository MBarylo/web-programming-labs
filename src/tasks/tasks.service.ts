import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, TaskPriority } from './types/task.type';
import { CreateTaskDto, UpdateTaskDto } from './dto';
@Injectable()
export class TasksService {
  // Масив для зберігання задач у пам'яті
  private tasks: Task[] = [
    {
      id: uuidv4(),
      title: 'Complete project documentation',
      description:
        'Write comprehensive documentation for the REST API including all endpoints and examples',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: uuidv4(),
      title: 'Review pull requests',
      description:
        'Review and approve pending pull requests from team members before deployment',
      status: TaskStatus.PENDING,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date('2024-01-16'),
    },
    {
      id: uuidv4(),
      title: 'Fix login bug',
      description:
        'Investigate and fix the authentication issue reported by users on mobile devices',
      status: TaskStatus.COMPLETED,
      priority: TaskPriority.LOW,
      createdAt: new Date('2024-01-10'),
    },
  ];
  // Отримати всі задачі
  findAll(): Task[] {
    return this.tasks;
  }
  // Пошук задач за статусом
  findByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }
  // Отримати одну задачу за ID
  findOne(id: string): Task | null {
    const task = this.tasks.find((task) => task.id === id);
    return task || null;
  }
  // Створити нову задачу
  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: uuidv4(),
      ...createTaskDto,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }
  // Оновити задачу
  update(id: string, updateTaskDto: UpdateTaskDto): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return null;
    }
    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
    };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }
  // Видалити задачу
  remove(id: string): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return false;
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}
