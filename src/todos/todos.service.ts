import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './todo-status.enum';


@Injectable()
export class TodosService {
    
    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository
    ){}

    async getTaskById(id: string): Promise<Task> {
        const found = this.tasksRepository.findOneBy({id:id})
        if(!found){
            throw new NotFoundException("Task with this ID not found")
        }
        return found
    }

    createTask(createTaskDto: CreateTodoDto): Promise<Task>{
       return this.tasksRepository.createTask(createTaskDto)
    }

    findAll(): Promise<Task[]> {
        return this.tasksRepository.find() 
    }

    deleteTask(id:string): Promise<any> {
        return this.tasksRepository.deleteTask(id)
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id)
        task.status = status
        await this.tasksRepository.save(task)
        return task
    }
}
