import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

    getTaskById( id: string): ITask {
        const task = this.tasks.find((t) => t.id === +id);
        if (!task) {
            throw new NotFoundTaskException()
        }
        return task;
    }

    createTask({task, tags, status}: CreateTaskDto): ITask {
        const newTask = new Task(task, tags, status)
        this.tasks.push(newTask)
        return newTask;
    }
}
