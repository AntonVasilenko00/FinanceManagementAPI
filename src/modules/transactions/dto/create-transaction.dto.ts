import { IsEnum, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator'
import { TransactionType } from '../types/transaction-type.enum'

export class CreateTransactionDto {
  @IsNotEmpty()
  amount: number

  @IsNotEmpty()
  @IsEnum(TransactionType, {
    message: `Invalid transaction type, allowed values: ${Object.values(
      TransactionType,
    )}`,
  })
  type: TransactionType

  @IsOptional()
  description: string

  @IsNotEmpty()
  @IsOptional()
  userId: number

  @ValidateIf((object) => !object.toAccountId || object.fromAccountId)
  @IsNotEmpty({
    message: 'At least one of accounts is required: fromAccountId',
  })
  fromAccountId: number

  @ValidateIf((object) => !object.fromAccountId || object.toAccountId)
  @IsNotEmpty({ message: 'At least one of accounts is required: toAccountId' })
  toAccountId: number
}
