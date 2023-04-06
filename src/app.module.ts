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
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { UsersRepository } from './auth/users.repository';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';

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
    entities: [Task, User]
  }),
  TypeOrmExModule.forCustomRepository([TaskRepository, UsersRepository]),
  AuthModule
],
  controllers: [AppController, TodosController, AuthController],
  providers: [AppService, TodosService, AuthService, JwtService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware, Logger).forRoutes(
      {path:"todos", method: RequestMethod.GET},
      {path:"todos*", method: RequestMethod.POST},
    )
  }
}
