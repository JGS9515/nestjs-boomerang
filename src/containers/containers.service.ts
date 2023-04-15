import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { LoggerService } from 'src/logger/logger.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { Container } from './entities/container.entity';




@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container) private readonly containersRepository: Repository<Container>,
    private readonly logger: LoggerService = new Logger(ContainersService.name),
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 10');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }

  create(createTaskDto: CreateContainerDto) {
    return 'This action adds a new container';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} container`;
  }

  update(id: number, updateTaskDto: UpdateContainerDto) {
    return `This action updates a #${id} container`;
  }

  remove(id: number) {
    return `This action removes a #${id} container`;
  }
}
