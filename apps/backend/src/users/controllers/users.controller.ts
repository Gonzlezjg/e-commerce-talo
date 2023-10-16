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
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { AuthenticationGuard } from 'src/authentication/guards/authentication.guard';

@Controller('users')
@UseGuards(AuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() userDto: UserDTO) {
    return await this.usersService.create(userDto);
  }

  @Get('all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findById(id);
  }

  @Put('update/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() userUpdateDTO: UserUpdateDTO,
  ) {
    return await this.usersService.update(id, userUpdateDTO);
  }

  @Delete('delete/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
}
