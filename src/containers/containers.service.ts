import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { LoggerService } from 'src/logger/logger.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { Container } from './entities/container.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container) private readonly containersRepository: Repository<Container>,
    private userService: UsersService
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    return "Called when the current second is 10";
  }

  @Interval(10000)
  handleInterval() {
    return 'Called every 10 seconds';
  }

  @Timeout(5000)
  handleTimeout() {
    return 'Called once after 5 seconds';
  }

  create(createTaskDto: CreateContainerDto) {
    return 'This action adds a new container';
  }

  async findAll() {
    return await this.containersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} container`;
  }


  update(id: number, updateContainerDto: UpdateContainerDto) {
    return `This action updates a #${id} container`;
  }
  async updateContainerOwner(containerId: number, newOwnerId: number) {
    const container = await this.containersRepository.findOne(containerId, {
      relations: ['user'],
    });

    if (!container) {
      return { status: 404, msg: 'Container not found' };
    }

    const newOwner = await this.userService.findUserAndContainerByUserId(newOwnerId);

    if (!newOwner) {
      return { status: 404, msg: 'New owner not found' };
    }

    // Check that the container is being transferred between users with different roles
    if (container.user.role === newOwner.role) {
      return { status: 400, msg: 'Containers can only be transferred between users with different roles' };

    }

    // Check that the new owner is a customer and has less than 2 containers
    if (newOwner.role === 'customer' && newOwner.containers.length > 1) {
      return { status: 400, msg: 'A customer user can\'t have more than 2 containers' };

    }

    container.user = newOwner;
    container.user_id = newOwnerId;

    return this.containersRepository.save(container);
  }

  remove(id: number) {
    return `This action removes a #${id} container`;
  }
}
