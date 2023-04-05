import {Repository} from "typeorm"
import { Task } from "./task.entity"
import { CustomRepository } from "src/database/typeorm-ex.decorator"
import { CreateTodoDto } from "./dto/create-todo-dto"
import { TaskStatus } from "./todo-status.enum"
import { NotFoundException } from "@nestjs/common"

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTodoDto): Promise<Task> {
        const {title, description} = createTaskDto

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        })

        await this.save(task)

        return task;
    }

    async deleteTask(id: string): Promise<any> {
        const result = await this.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException("Task with this ID not found")
        }else{
            return {
                status: 200,
                message:"tache supprimé avec succès"
            }
        }
    }
}