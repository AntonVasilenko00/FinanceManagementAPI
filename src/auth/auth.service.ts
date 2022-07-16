import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity'
import { Payload } from './types/payload.type'
import { TokenDto } from './dto/token.dto'
import { SignupDto } from './dto/signup.dto'
import { Role } from 'src/users/roles'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findOneBy({ email })

    if (user && user.comparePassword(password)) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async signup(signupDto: SignupDto): Promise<TokenDto> {
    const user = await this.usersService.create({
      ...signupDto,
      role: Role.USER,
    })

    return this.login(user)
  }

  async login(user: Partial<User>): Promise<TokenDto> {
    const payload: Payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
