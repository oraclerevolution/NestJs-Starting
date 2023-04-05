import {IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTodoDto {
    readonly id: number;
    @IsNotEmpty()
    @MinLength(6,{
        message:"La taille minimale du champ title est de 6 caractère"
    })
    readonly title: string;
    @IsString()
    readonly description?: string
    readonly done: string;
}