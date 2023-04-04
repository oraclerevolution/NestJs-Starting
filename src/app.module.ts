import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { Logger } from './middlewares/Logger.middleware';
TodosController

@Module({
  imports: [TodosModule],
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
