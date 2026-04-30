import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, TaskPriority } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Learn NestJS',
      description: 'Study basics',
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Do lab',
      description: 'Finish lab work',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Submit work',
      description: 'Send to teacher',
      status: TaskStatus.DONE,
      priority: TaskPriority.HIGH,
      createdAt: new Date(),
    },
  ];

  findAll() {
    return this.tasks;
  }

  findByStatus(status: TaskStatus) {
    return this.tasks.filter((t) => t.status === status);
  }

  findOne(id: number) {
    return this.tasks.find((t) => t.id === id) || null;
  }

  create(dto: CreateTaskDto) {
    const newTask: Task = {
      id: Date.now(),
      ...dto,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findOne(id);
    if (!task) return null;

    Object.assign(task, dto);
    return task;
  }

  remove(id: number) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}
