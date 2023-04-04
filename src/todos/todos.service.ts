import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo-dto';

@Injectable()
export class TodosService {
    
    todos: Todo[] = [
        {
            id:1,
            title: "todos app",
            done: false,
            description: "Create NestJS todos app",
        },
        {
            id:2,
            title: "bread",
            done: true,
            description: "buy bread",
        },
        {
            id:3,
            title: "wine",
            done: true,
            description: "buy wine",
        }
    ]

    findOne(id: string){
        return this.todos.find(todo => todo.id === Number(id))
    }

    findAll(): Todo[] {
        return this.todos 
    }

    create(todo: CreateTodoDto){
        this.todos = [...this.todos, todo as Todo]
    }

    update(id: string, todo: Todo){
        //retrieve the todo to update
        const todoToUpdate = this.todos.find(t => t.id === Number(id))
        if(!todoToUpdate){
            return new NotFoundException('boooo did you find this todo')
        }
        //apply to granulary update a single property
        if(todo.hasOwnProperty('done')) {
            todoToUpdate.done = todo.done
        }
        if(todo.title) {
            todoToUpdate.title = todo.title
        }
        if(todo.description) {
            todoToUpdate.description = todo.description
        }

        const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate)
        this.todos = [...updatedTodos]
        return { updatedTodos:1, todo: todoToUpdate}
    }

    delete(id:string){
        const nbOfTodosBeforeDelete = this.todos.length
        this.todos = [...this.todos.filter(t => t.id !== +id)]
        if(this.todos.length < nbOfTodosBeforeDelete){
            return { deletedTodos:1, nbTodos: this.todos.length}
        }else{
            return { deletedTodos:0, nbTodos: this.todos.length}
        }
    }
}
