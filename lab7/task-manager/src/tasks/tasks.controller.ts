import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('search')
  findByStatus(@Query('status') status: TaskStatus) {
    return this.service.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const task = this.service.findOne(id);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    const task = this.service.update(id, dto);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const ok = this.service.remove(id);
    if (!ok) throw new NotFoundException();
  }
}
