import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, UserUpdateDTO } from '../dto/user.dto';
import { AuthenticationGuard } from 'src/authentication/guards/authentication.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { PublicAccess } from 'src/authentication/decorators/public.decorator';

@Controller('users')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('create')
  async create(@Body() userDto: CreateUserDTO) {
    return await this.usersService.create(userDto);
  }

  @Roles('ADMIN')
  @Get('all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles('CLIENT')
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findById(id);
  }

  @Roles('CLIENT')
  @Put('update/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() userUpdateDTO: UserUpdateDTO,
  ) {
    return await this.usersService.update(id, userUpdateDTO);
  }

  @Roles('ADMIN')
  @Delete('delete/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
}
