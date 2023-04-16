import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContainerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

}
