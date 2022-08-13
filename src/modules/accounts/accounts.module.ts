import { Module } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { AccountsController } from './accounts.controller'
import { UsersModule } from '../users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from './entities/account.entity'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
