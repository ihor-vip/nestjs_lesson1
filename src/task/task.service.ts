import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Task} from "@src/task/task.entity";
import {ITask} from "@src/task/task.interface";
import {CreateTaskDto} from "@src/task/dto/create-task.dto";
import {NotFoundTaskException} from "@src/task/exception/not-found-task.exception";

@Injectable()
export class TaskService {
    public tasks: ITask[] = []

    getTasks(): ITask[] {
        return this.tasks;
    }

    getTaskById( id: number): ITask {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) {
            throw new NotFoundTaskException()
        }
        return task;
    }

    createTask({task, email, tags, status}: CreateTaskDto): ITask {
        const newTask = new Task(task,email, tags, status)
        this.tasks.push(newTask)
        return newTask;
    }

    getTasksByEmail(email: string): ITask[] {
        const tasks = this.tasks.filter((t) => t.email === email);
        if (!tasks || tasks.length === 0) {
            throw  new BadRequestException('tasks not found')
        }
        return tasks;
    }
}
