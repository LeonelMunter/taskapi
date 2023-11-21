import { Controller, Get, Post, Delete, Put, Body, Param, ConflictException, NotFoundException, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task-dto';
import { UpdateTaskDto } from 'src/dto/update-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksServices: TasksService) {}

    @Get()
    findAll() {
        return this.tasksServices.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
       const task = await this.tasksServices.findOne(id)
       if (!task) throw new NotFoundException('task not found');
       return task
    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        try {
            return await this.tasksServices.create(body)
        } catch (error) {
            if(error.code === 11000) {
                throw new ConflictException('task already exist')
            }
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        const task = await this.tasksServices.delete(id);
        if (!task) throw new NotFoundException('task not found');
        return task
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        const task = await this.tasksServices.update(id, body)
        if (!task) throw new NotFoundException('task not updated');
        return task
    }
}

