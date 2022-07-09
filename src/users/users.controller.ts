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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiConflictResponse({ description: 'Duplicate username or email' })
  @ApiBadRequestResponse({ description: 'Failed to create user' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto)
    } catch (error) {
      this.handleUniqueValuesError(error, createUserDto)

      throw new HttpException(
        error.detail || error.message || 'Failed to create user',
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Failed to find user' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(+id)

      if (!user) throw new NotFoundException(`User with id ${id} not found`)

      return user
    } catch (error) {
      if (error instanceof NotFoundException) throw error

      throw new HttpException('Invalid param id', HttpStatus.BAD_REQUEST)
    }
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Duplicate username or email' })
  @ApiBadRequestResponse({ description: 'Failed to update user' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.usersService.update(+id, updateUserDto)

      if (!user) throw new NotFoundException(`User with id ${id} not found`)

      return user
    } catch (error) {
      this.handleUniqueValuesError(error, updateUserDto)
      if (error instanceof NotFoundException) throw error

      console.log(error)

      throw new BadRequestException('Invalid param id')
    }
  }

  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Failed to delete user' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    try {
      const { affected } = await this.usersService.remove(+id)

      if (!affected) throw new NotFoundException(`User with id ${id} not found`)

      return `User with id ${id} deleted`
    } catch (error) {
      if (error instanceof NotFoundException) throw error

      throw new HttpException('Invalid param id', HttpStatus.BAD_REQUEST)
    }
  }

  private handleUniqueValuesError(
    error: any,
    dto: CreateUserDto | UpdateUserDto,
  ) {
    if (error.code === '23505') {
      if (error.detail.includes(dto.email))
        throw new ConflictException('User with such email already exists')
      if (error.detail.includes(dto.username))
        throw new ConflictException('User with such username already exists')
    }
  }
}
