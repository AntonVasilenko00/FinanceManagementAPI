import { User } from '../../users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TransactionType } from '../types/transaction-type.enum'
import { Account } from '../../accounts/entities/account.entity'
import { ApiHideProperty } from '@nestjs/swagger'

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  amount: number

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  fromAccountId: number

  @Column({ nullable: true })
  toAccountId: number

  @ApiHideProperty()
  @ManyToOne((type) => User, (user) => user.transactions, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User

  @ApiHideProperty()
  @ManyToMany((type) => Account, (account) => account.transactions)
  accounts: Account[]

  @ApiHideProperty()
  @ManyToOne((type) => Account, (account) => account.outcomingTransactions, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'fromAccountId' })
  fromAccount: Account

  @ApiHideProperty()
  @ManyToOne((type) => Account, (account) => account.incomingTransactions, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'toAccountId' })
  toAccount: Account

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
