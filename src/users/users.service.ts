import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ContainersService } from 'src/containers/containers.service';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private containerService: ContainersService,
    
    ) {}

  create(createUserDto: UsersDTO): Promise<User> {
    const user = new User();

    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email: email,
    });
  }
  async findOneById(id: number): Promise<any> {
    // let user = await this.usersRepository.findOne({
    //   id: id,
    // });
    // let container = this.containerService.findOne(id)
    // return user
    const user = await this.usersRepository.findOne(id, { relations: ['containers'] });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    const { role, name, containers } = user;

    return {
      id,
      role,
      name,
      assignedContainers: containers.map(container => ({
        id: container.id,
        name: container.name,
      })),
    };
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
