import { Body, Controller, Get, Post, Param, Patch, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo-dto';
import { Task } from './task.entity';
import { UpdateTodoDto } from './dto/update-todo-dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService){}

    // @Get(':id')
    // findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_FOUND}
    // )) id:string){
    //     return this.todosService.findOne(id)
    // }

    @Get(':id')
    getTaskById(@Param('id') id:string):Promise<Task>{
        return this.todosService.getTaskById(id)
    }

    @Get() 
    findAll(): Promise<Task[]> {
        return this.todosService.findAll();
    }


    @Post()
    createTodo(@Body() newTodo: CreateTodoDto): Promise<Task> {
        return this.todosService.createTask(newTodo);
    }

    // @Patch(':id')
    // updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto){
    //     return this.todosService.update(id, todo)
    // }

    // @Patch(':id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body() updateTodo: UpdateTodoDto
    // ): Promise<Task>{
    //     const {status} = updateTodo
    //     return this.todosService.updateTaskStatus(id,status)
    // }

    @Delete(':id')
    deleteTodo(@Param('id') id:string){
        return this.todosService.deleteTask(id)
    }
}
