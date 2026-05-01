import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Task, TaskStatus } from './task.entity';
import { Tag } from '../tags/tags.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  findAll() {
    return this.taskRepo.find({
      relations: ['tags'],
    });
  }

  findByStatus(status: TaskStatus) {
    return this.taskRepo.find({
      where: { status },
      relations: ['tags'],
    });
  }

  findOne(id: number) {
    return this.taskRepo.findOne({
      where: { id },
      relations: ['tags'],
    });
  }

  async create(dto: CreateTaskDto) {
    let tags: Tag[] = [];

    if (dto.tagIds) {
      tags = await this.tagRepo.find({
        where: { id: In(dto.tagIds) },
      });
    }

    const task = this.taskRepo.create({
      ...dto,
      tags,
    });

    return this.taskRepo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if (!task) return null;

    if (dto.tagIds) {
      task.tags = await this.tagRepo.find({
        where: { id: In(dto.tagIds) },
      });
    }

    Object.assign(task, dto);

    return this.taskRepo.save(task);
  }

  async remove(id: number) {
    const result = await this.taskRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
