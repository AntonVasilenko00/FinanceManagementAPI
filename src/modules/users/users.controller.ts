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
import { UserNotFoundException } from './exceptions/user-not-found.exception'
import { ParseIdParamPipe } from '../../common/pipes/parse-id-param.pipe'

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
    @Param('id', ParseIdParamPipe)
    id: number,
  ): Promise<User> {
    const user = await this.usersService.findOneById(id)

    if (!user) throw new UserNotFoundException(id)

    return user
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Duplicate username or email' })
  @ApiBadRequestResponse({ description: 'Failed to update user' })
  @Patch(':id')
  async update(
    @Param('id', ParseIdParamPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.update(id, updateUserDto)

    if (!user) throw new UserNotFoundException(id)

    return user
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Failed to delete user' })
  @Delete(':id')
  async remove(
    @Param('id', ParseIdParamPipe)
    id: number,
  ): Promise<string> {
    const { affected } = await this.usersService.remove(id)

    if (!affected) throw new UserNotFoundException(id)

    return `User with id ${id} deleted`
  }
}
