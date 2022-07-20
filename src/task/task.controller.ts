import {Body, Controller, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {ITask} from "@src/task/task.interface";
import {TaskService} from "@src/task/task.service";
import {CreateTaskDto} from "@src/task/dto/create-task.dto";

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {
  }

    @Get()
    getTasks(): ITask[] {
        return this.taskService.getTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): ITask {
        return this.taskService.getTaskById(id);
    }

    @UsePipes( new ValidationPipe())
    @Post()
    createTask(@Body() task: CreateTaskDto): ITask {
        return this.taskService.createTask(task);
    }

}
