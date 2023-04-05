import {IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateTodoDto {

    readonly status: {
        done: string
    }
}