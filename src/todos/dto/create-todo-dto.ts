import { IsBoolean, IsNumber, IsOptional, IsString, MinLength, isNotEmpty } from "class-validator";

export class CreateTodoDto {
    @IsNumber()
    readonly id: number;
    @IsString()
    @MinLength(6,{
        message:"La taille minimale du champ title est de 6 caractère"
    })
    readonly title: string;
    @IsString()
    readonly description?: string
    @IsBoolean()
    readonly done: boolean;
}