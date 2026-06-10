import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Task, (task) => task.tags, {
    onDelete: 'CASCADE',
  })
  tasks!: Task[];
}
