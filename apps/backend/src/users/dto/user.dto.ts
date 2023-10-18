import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(ROLES)
  role?: ROLES;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
export class UserDTO {
  @IsNotEmpty()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role?: ROLES;

  @IsNotEmpty()
  @IsString()
  firstname?: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}
export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(ROLES)
  role?: ROLES;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
