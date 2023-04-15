import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Container } from 'src/containers/entities/container.entity';

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
    default: Role.customer,
  })
  role: Role;

  @OneToMany(() => Container, container => container.user)
  containers: Container[];
}
