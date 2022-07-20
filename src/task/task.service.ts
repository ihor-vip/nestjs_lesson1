import {Body, Injectable, Param} from '@nestjs/common';
import {Task} from "@src/task/task.entity";
import {ITask} from "@src/task/task.interface";
import {CreateTaskDto} from "@src/task/dto/create-task.dto";

@Injectable()
export class TaskService {
    public tasks: ITask[] = []

    getTasks(): ITask[] {
        return this.tasks;
    }

    getTaskById( id: string): ITask {
        const task = this.tasks.find((t) => t.id === +id);
        return task;
    }

    createTask({task, tags, status}: CreateTaskDto): ITask {
        const newTask = new Task(task, tags, status)
        this.tasks.push(newTask)
        return newTask;
    }
}
