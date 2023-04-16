import { PartialType } from '@nestjs/mapped-types';
import { CreateContainerDto } from './create-container.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateContainerDto extends PartialType(CreateContainerDto) {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    user_id: number
}


