import { OmitType } from '@nestjs/swagger'

import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { Role } from 'src/users/roles'

export class SignupDto extends OmitType(CreateUserDto, ['role']) {}
