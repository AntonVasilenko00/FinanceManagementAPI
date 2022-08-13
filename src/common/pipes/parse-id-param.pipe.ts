import {
  ArgumentMetadata,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common'

export class ParseIdParamPipe extends ParseIntPipe {
  constructor(idName: string = 'id param') {
    super({
      exceptionFactory: () =>
        new BadRequestException(`${idName} must be a number`),
    })
  }
}
