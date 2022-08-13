import { Module } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { TransactionsController } from './transactions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from '../accounts/entities/account.entity'
import { Transaction } from './entities/transaction.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
