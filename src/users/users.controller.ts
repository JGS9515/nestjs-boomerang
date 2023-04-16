import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { Role } from './enums/role.enum';
import { Roles } from '../custom.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createTaskDto: UsersDTO) {
    return this.usersService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.customer)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findUserAndContainerByUserId(id);
  }
  

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTaskDto: UpdateContainerDto) {
//     return this.usersService.update(updateTaskDto);
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
