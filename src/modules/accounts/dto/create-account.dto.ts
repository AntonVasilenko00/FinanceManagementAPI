import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CurrencyCode } from '../../../common/enums/currency.enum'

export class CreateAccountDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  description: string

  @IsOptional()
  balance: number

  @IsEnum(CurrencyCode, {
    message: `Invalid currency code, allowed values: ${Object.values(
      CurrencyCode,
    )}`,
  })
  currency: CurrencyCode

  @IsNotEmpty()
  userId: number
}
