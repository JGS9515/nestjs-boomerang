import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { CreateTaskDto } from './dto/create-container.dto';
import { UpdateTaskDto } from './dto/update-container.dto';

@Controller('containers')
export class ContainersController {
  constructor(private readonly tasksService: ContainersService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
