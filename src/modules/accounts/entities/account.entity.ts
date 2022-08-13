import { User } from '../../users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CurrencyCode } from '../../../common/enums/currency.enum'
import { Transaction } from 'src/modules/transactions/entities/transaction.entity'
import { ApiHideProperty } from '@nestjs/swagger'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ default: 0 })
  balance: number

  @Column({
    type: 'varchar',
    enum: CurrencyCode,
    default: CurrencyCode.USD,
  })
  currency: CurrencyCode

  @Column()
  userId: number

  @ApiHideProperty()
  @ManyToOne((type) => User, (user) => user.accounts, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User

  @ApiHideProperty()
  @ManyToMany((type) => Transaction, (transaction) => transaction.accounts)
  transactions: Transaction[]

  @ApiHideProperty()
  @OneToMany((type) => Transaction, (transaction) => transaction.toAccountId)
  incomingTransactions: Transaction[]

  @ApiHideProperty()
  @OneToMany((type) => Transaction, (transaction) => transaction.fromAccountId)
  outcomingTransactions: Transaction[]
}
