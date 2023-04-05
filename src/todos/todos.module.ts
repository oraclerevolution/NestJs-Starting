import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([TaskRepository])
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
