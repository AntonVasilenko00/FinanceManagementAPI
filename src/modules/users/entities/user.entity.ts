import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Role } from '../roles'
import { Transaction } from '../../transactions/entities/transaction.entity'
import { Account } from 'src/modules/accounts/entities/account.entity'

@Entity()
export class User {
  @ApiProperty({ example: 12, examples: [1, 2, 3, 4, 5] })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    example: 'JohnGuy2000',
    uniqueItems: true,
  })
  @Column({ unique: true })
  username: string

  @ApiProperty({
    example: 'hardPassword123',
    minLength: 8,
    maxLength: 20,
  })
  @Column()
  password: string

  @ApiProperty({ example: 'john.doe@gmail.com', uniqueItems: true })
  @Column({ unique: true })
  email: string

  @ApiProperty({ example: 'John' })
  @Column()
  firstName: string

  @ApiProperty({ example: 'Doe' })
  @Column()
  lastName: string

  @ApiProperty({ enum: Role })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role

  @ApiHideProperty()
  @OneToMany((type) => Transaction, (transaction) => transaction.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  transactions: Transaction[]

  @ApiHideProperty()
  @OneToMany((type) => Account, (account) => account.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  accounts: Account[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(password?: string): string {
    this.password = bcrypt.hashSync(password || this.password, 10)
    return this.password
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }
}
