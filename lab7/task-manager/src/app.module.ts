import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
