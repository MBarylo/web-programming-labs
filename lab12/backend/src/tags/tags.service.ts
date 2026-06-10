import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  create(name: string) {
    const tag = this.tagRepo.create({ name });
    return this.tagRepo.save(tag);
  }

  findAll() {
    return this.tagRepo.find();
  }

  async update(id: number, name: string) {
    const tag = await this.tagRepo.findOneBy({ id });
    if (!tag) return null;

    tag.name = name;
    return this.tagRepo.save(tag);
  }

  async remove(id: number) {
    const result = await this.tagRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
