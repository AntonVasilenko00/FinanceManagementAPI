import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserNotFoundException } from '../users/exceptions/user-not-found.exception'
import { UsersService } from '../users/users.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { Account } from './entities/account.entity'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private readonly repository: Repository<Account>,
    private readonly usersService: UsersService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const user = await this.usersService.findOneById(createAccountDto.userId)

    if (!user) throw new UserNotFoundException(createAccountDto.userId)

    await this.validateAccountName(
      createAccountDto.userId,
      createAccountDto.name,
    )

    const account = await this.repository.create(createAccountDto)

    return await this.repository.save(account)
  }

  async findAll() {
    return await this.repository.find({})
  }

  async findOne(id: number) {
    return await this.repository.findOneBy({ id })
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.repository.findOneBy({ id })

    if (!account) throw new NotFoundException(`Account not found, id=${id}`)

    if (updateAccountDto.name)
      await this.validateAccountName(account.userId, updateAccountDto.name)

    return await this.repository.update(id, updateAccountDto)
  }

  async remove(id: number) {
    return await this.repository.delete(id)
  }

  private async validateAccountName(userId: number, name: string) {
    const existingAccount = await this.repository.findOneBy({
      userId,
      name,
    })

    if (existingAccount)
      throw new ConflictException(
        `Account with name "${name}" already exists for user, userId=${userId}`,
      )
  }
}
