import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-container.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
