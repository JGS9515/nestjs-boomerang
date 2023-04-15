import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity("users")
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column({
    type: 'enum',
    enum: Role,
    default: Role.costumer,
  })
  role: Role;
}
