import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import jwtConfig from '../../../config/jwt.config'
import { User } from '../../users/entities/user.entity'
import { Payload } from '../types/payload.type'

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    })
  }

  async validate(payload: Payload): Promise<Partial<User>> {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    }
  }
}
