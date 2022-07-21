import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {ITask} from "@src/task/task.interface";
import {TaskService} from "@src/task/task.service";
import {CreateTaskDto} from "@src/task/dto/create-task.dto";
import {EmailPipe} from "@src/task/pipes/email.pipe";


@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {
  }

    @Get()
    getTasks(): ITask[] {
      throw new HttpException('error', 400)
        return this.taskService.getTasks();
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): ITask {
        return this.taskService.getTaskById(id);
    }

    @UsePipes( new ValidationPipe())
    @Post()
    createTask(@Body() task: CreateTaskDto): ITask {
        return this.taskService.createTask(task);
    }

    @Get('email/:email')
    getTasksByEmail(@Param('email', EmailPipe) email: string): ITask[] {
        return this.taskService.getTasksByEmail(email);
    }

}
