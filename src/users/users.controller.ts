import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  HttpException,
  ConflictException,
  BadRequestException,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger'

import { User } from './entities/user.entity'
import { UserExceptionFilter } from './filters/user.exception-filter'

@ApiTags('Users')
@Controller('users')
@UseFilters(new UserExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiConflictResponse({ description: 'Duplicate username or email' })
  @ApiBadRequestResponse({ description: 'Failed to create user' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Failed to find user' })
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException('id param must be a number'),
      }),
    )
    id: string,
  ): Promise<User> {
    const user = await this.usersService.findOneById(+id)

    if (!user) throw new NotFoundException(`User with id ${id} not found`)

    return user
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Failed to update user' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.update(+id, updateUserDto)

    if (!user) throw new NotFoundException(`User with id ${id} not found`)

    return user
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Failed to delete user' })
  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException('id param must be a number'),
      }),
    )
    id: string,
  ): Promise<string> {
    const { affected } = await this.usersService.remove(+id)

    if (!affected) throw new NotFoundException(`User with id ${id} not found`)

    return `User with id ${id} deleted`
  }
}
