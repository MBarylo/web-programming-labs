import { IsString, IsEnum } from 'class-validator';
import { TaskStatus, TaskPriority } from '../task.entity';
import { IsOptional, IsArray } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsOptional()
  @IsArray()
  tagIds?: number[];
}
