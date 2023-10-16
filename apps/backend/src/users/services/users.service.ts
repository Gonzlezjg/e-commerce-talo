import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ErrorHandler } from 'src/config/error.handler';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository) {}

  async create(body: UserDTO): Promise<UserEntity> {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.SALT);
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorHandler.createError(error.message);
    }
  }

  async find({
    key,
    value,
  }: {
    key: keyof UserDTO;
    value: any;
  }): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .addSelect('users.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorHandler.createError(error.message);
    }
  }
  async findAll(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorHandler({
          type: 'NOT_FOUND',
          message: 'No se encontraron resultados',
        });
      }
      return users;
    } catch (error) {
      throw ErrorHandler.createError(error.message);
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw ErrorHandler.createError(error.message);
    }
  }

  async update(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);

      if (user.affected === 0) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }

      return user;
    } catch (error) {
      throw ErrorHandler.createError(error.message);
    }
  }

  async delete(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (user.affected === 0) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }

      return user;
    } catch (error) {
      throw ErrorHandler.createError(error.message);
    }
  }
}
