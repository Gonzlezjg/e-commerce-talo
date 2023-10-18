import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ROLES } from 'src/constants/roles';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/keys';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const getRoles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { userRole } = req;

    if (getRoles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && userRole === admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'No tienes suficientes permisos para realizar esta operacion',
        );
      }
    }

    if (userRole === ROLES.ADMIN) {
      return true;
    }

    const isAuthenticated = getRoles.some((role) => role === userRole);

    if (!isAuthenticated) {
      throw new UnauthorizedException('No tienes permisos para esta operacion');
    }
    return true;
  }
}
