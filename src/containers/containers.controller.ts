import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';

@Controller('containers')
export class ContainersController {
  constructor(
    private readonly containersService: ContainersService
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateContainerDto) {
    return this.containersService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.containersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.containersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateContainerDto) {
    return this.containersService.update(+id, updateTaskDto);
  }

  @Patch('/move/:id')
  updateContainerOwner(@Param('id') id: number, @Body() updateContainerDto: UpdateContainerDto) {
    if(!updateContainerDto.user_id){
      return { status: 400, msg: 'Bad Request' };
    }
    return this.containersService.updateContainerOwner(id, updateContainerDto.user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.containersService.remove(+id);
  }
}
