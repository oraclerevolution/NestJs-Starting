import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./todo-status.enum.js";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}