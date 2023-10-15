import { BaseEntity } from '../../config/base';
import { ROLES } from '../../constants/roles';
import { IUser } from '../../interfaces/user.interface';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ROLES,
  })
  role: ROLES;

  @Column()
  firstname: string;

  @Column({ default: true })
  isActive: boolean;
}
