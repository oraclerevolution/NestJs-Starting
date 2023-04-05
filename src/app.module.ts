import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { Logger } from './middlewares/Logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './todos/task.repository';
import { Task } from './todos/task.entity';
import { TypeOrmExModule } from './database/typeorm-ex.module';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username:"postgres",
    password:'postgres',
    database:"task-managment",
    autoLoadEntities:true,
    synchronize: true,
    entities: [Task]
  }),
  TypeOrmExModule.forCustomRepository([TaskRepository])
],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware, Logger).forRoutes(
      {path:"todos", method: RequestMethod.GET},
      {path:"todos*", method: RequestMethod.POST},
    )
  }
}
