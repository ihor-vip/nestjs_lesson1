import {Status} from "@src/task/task.interface";
import {ArrayNotEmpty, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateTaskDto{

    @IsString({message: 'task required'})
    @IsNotEmpty({message: 'task required'})
    task: string;

    @ArrayNotEmpty({message: 'tags required'})
    @IsString({each: true, message: 'tags must be a string'})
    tags?: string[];

    @IsOptional()
    @IsEnum(Status,{message:'wrong status'})
    status?: Status;
}
