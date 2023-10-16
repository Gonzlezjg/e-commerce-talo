import { AuthenticationService } from './../services/authentication.service';
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthenticationBody } from '../interfaces/authentication.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() { username, password }: AuthenticationBody) {
    const userIsValid = await this.authenticationService.validateUser(
      username,
      password,
    );
    if (!userIsValid) {
      throw new UnauthorizedException('Data not valid');
    }
    const JWT = await this.authenticationService.generateJWT(userIsValid);

    return JWT;
  }
}
