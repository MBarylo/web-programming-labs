import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';

import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly service: TagsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    const tag = await this.service.update(id, name);
    if (!tag) throw new NotFoundException();
    return tag;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const ok = await this.service.remove(id);
    if (!ok) throw new NotFoundException();
  }
}
