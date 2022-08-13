import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    if (exception.driverError.code === '23505') {
      if (exception.driverError.detail.includes('username')) {
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Username already exists',
          error: 'Conflict',
        })
      }
      if (exception.driverError.detail.includes('email')) {
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Email already exists',
          error: 'Conflict',
        })
      }
    }

    console.log(exception)

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unknown user error',
      error: 'Unknown',
    })
  }
}
