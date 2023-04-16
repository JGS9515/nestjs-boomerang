import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ContainersService } from './containers.service';
import { ContainersController } from './containers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from './entities/container.entity';


@Module({  
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Container]), 
  ],
  controllers: [ContainersController],
  providers: [ContainersService],
  exports: [ContainersService],
})
export class ContainersModule {}
