export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class Task {
  id!: number;
  title!: string;
  description!: string;
  status!: TaskStatus;
  priority!: TaskPriority;
  createdAt!: Date;
}
