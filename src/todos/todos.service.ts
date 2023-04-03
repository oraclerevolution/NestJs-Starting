import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

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

    create(todo: Todo){
        this.todos = [...this.todos, todo]
    }
}
