import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '../roles'

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
  @Column()
  role: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(password?: string): string {
    this.password = bcrypt.hashSync(password, 10)
    return this.password
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }
}
