import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserDto)

    return await this.usersRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id })
  }

  async findOneBy(options: FindOptionsWhere<User>): Promise<User> {
    return await this.usersRepository.findOneBy(options)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id)

    const { password: newPassword } = updateUserDto

    if (user) {
      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
        password: newPassword ? user.hashPassword(newPassword) : user.password,
      })

      return updatedUser
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id)
  }
}
