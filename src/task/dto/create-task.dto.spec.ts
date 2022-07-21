import {plainToInstance} from "class-transformer";
import {CreateTaskDto} from "./create-task.dto";
import {validate} from "class-validator";
import {Status} from "../task.interface";

describe('create-task.dto', () => {
    let dto;
    beforeAll(() => {
        dto = {
            task: '',
            tags: [],
            status: '',
        };
    });
    it('task empty', async () => {
        const ofImportDto = plainToInstance(CreateTaskDto,dto);
        const errors = await validate(ofImportDto);
        expect(errors.map(err => err.property).includes('task')).toBeTruthy();
    })
    it('task not empty', async () => {
        dto.task = 'some task';
        const ofImportDto = plainToInstance(CreateTaskDto,dto);
        const errors = await validate(ofImportDto);
        expect(errors.map(err => err.property).includes('task')).toBeFalsy();
    })
    it('tags empty', async () => {
        const ofImportDto = plainToInstance(CreateTaskDto,dto);
        const errors = await validate(ofImportDto);
        expect(errors.map(err => err.property).includes('tags')).toBeTruthy();
        expect(dto.tags.length).toBe(0);
    })
    it('not every tag is string ', async () => {
        dto.tags = ['some task', 1];
        const ofImportDto = plainToInstance(CreateTaskDto,dto);
        const errors = await validate(ofImportDto);
        expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
        expect(dto.tags.length).not.toBe(0);
        expect(dto.tags.every((el) => typeof el === 'string')).not.toBeTruthy()
    })
    it('every tag is string and not empty array', async () => {
        dto.tags = ['some task', '1'];
        const ofImportDto = plainToInstance(CreateTaskDto,dto);
        const errors = await validate(ofImportDto);
        expect(errors.map((err) => err.property).includes('tags')).toBeFalsy();
    })
    it('status not exist in status.enum', async () => {
        dto.status = 'status';
        const ofImportDto = plainToInstance(CreateTaskDto,dto);
        const errors = await validate(ofImportDto);
        expect(errors.map((err) => err.property).includes('status')).toBeTruthy();
    })
    it('status exist in status.enum', async () => {
        dto.status = Status.ERROR;
        const ofImportDto = plainToInstance(CreateTaskDto,dto);
        const errors = await validate(ofImportDto);
        expect(errors.map((err) => err.property).includes('status')).toBeFalsy();
        expect(dto.status).toBe('error')
    })
})
