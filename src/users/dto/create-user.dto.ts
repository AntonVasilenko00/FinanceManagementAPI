import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Role } from '../roles'

export class CreateUserDto {
  @ApiProperty({ example: 'JohnnySix' })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({ example: 'superSecret777' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string

  @ApiProperty({ example: 'random.email@gmail.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiPropertyOptional({ example: Role.ADMIN, default: Role.USER })
  @IsNotEmpty()
  @IsEnum(Role, {
    message: `Invalid role, allowed values: ${Object.values(Role)}`,
  })
  @IsOptional()
  role: Role = Role.USER
}
