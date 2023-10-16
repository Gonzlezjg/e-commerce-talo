import { ROLES } from 'src/constants/roles';
import { UserEntity } from 'src/users/entities/user.entity';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

export interface AuthenticationBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserEntity;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUserToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
