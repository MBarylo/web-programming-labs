import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskStatus } from './types/task.type';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  // GET /tasks - Отримати всі задачі
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  // GET /tasks/search?status=... - Пошук за статусом
  @Get('search')
  findByStatus(@Query('status') status: TaskStatus) {
    return this.tasksService.findByStatus(status);
  }
  // GET /tasks/:id - Отримати задачу за ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    const task = this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
  // POST /tasks - Створити нову задачу
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  // PATCH /tasks/:id - Оновити задачу
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = this.tasksService.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
  // DELETE /tasks/:id - Видалити задачу
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const deleted = this.tasksService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
