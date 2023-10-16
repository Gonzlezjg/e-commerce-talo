import { UsersService } from './../../users/services/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  AuthResponse,
  PayloadToken,
} from '../interfaces/authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UsersService) {}

  public async validateUser(username: string, password: string) {
    const userName = await this.userService.find({
      key: 'username',
      value: username,
    });

    const email = await this.userService.find({
      key: 'email',
      value: username,
    });

    if (userName) {
      const match = await bcrypt.compare(password, userName.password);
      if (match) return userName;
    }

    if (email) {
      const match = await bcrypt.compare(password, email.password);
      if (match) return email;
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserEntity): Promise<AuthResponse> {
    const getUser = await this.userService.findById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.TOKEN_JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
