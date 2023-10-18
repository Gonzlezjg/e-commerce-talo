import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base';
import { ROLES } from '../../constants/roles';
import { IUser } from '../../interfaces/user.interface';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column({ nullable: true })
  username?: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.CLIENT,
  })
  role?: ROLES;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ default: true })
  isActive?: boolean;
}
