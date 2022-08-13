import { Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '../users/users.service'
import { UserNotFoundException } from '../users/exceptions/user-not-found.exception'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
    private readonly usersService: UsersService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const user = await this.usersService.findOneById(
      createTransactionDto.userId,
    )

    if (!user) throw new UserNotFoundException(createTransactionDto.userId)

    const transaction = await this.repository.create(createTransactionDto)

    return this.repository.save(transaction)
  }

  async findAll() {
    return await this.repository.find()
  }

  async findOne(id: number) {
    return await this.repository.findOneBy({ id })
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return await this.repository.update(id, updateTransactionDto)
  }

  async remove(id: number) {
    return await this.repository.delete(id)
  }
}
