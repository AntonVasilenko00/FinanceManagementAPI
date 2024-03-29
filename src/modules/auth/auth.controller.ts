import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { ApiConflictResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserExceptionFilter } from '../users/filters/user.exception-filter'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { SignupDto } from './dto/signup.dto'
import { TokenDto } from './dto/token.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiConflictResponse({ description: 'Duplicate username or email' })
  @UseFilters(new UserExceptionFilter())
  async signup(@Body() signupDto: SignupDto): Promise<TokenDto> {
    return this.authService.signup(signupDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    )

    return this.authService.login(user)
  }
}
