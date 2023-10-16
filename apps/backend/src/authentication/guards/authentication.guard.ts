import { UsersService } from './../../users/services/users.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { decodeToken } from 'src/utils/token';
import { IUserToken } from '../interfaces/authentication.interface';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers['a-token'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Token invalido');
    }

    const asegurateToken: IUserToken | string = decodeToken(token);

    if (typeof asegurateToken === 'string') {
      throw new UnauthorizedException(asegurateToken);
    }

    if (asegurateToken.isExpired) {
      throw new UnauthorizedException('Token Expirado');
    }

    const getUser = await this.usersService.findById(asegurateToken.sub);

    if (!getUser) {
      throw new UnauthorizedException('Usuario invalido');
    }

    request.userId = getUser.id;
    request.userRole = getUser.role;

    return true;
  }
}
