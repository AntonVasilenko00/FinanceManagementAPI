import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { config } from 'rxjs'
import { AppModule } from './app.module'
import appConfig from './config/app.config'
import swaggerConfig, { swaggerDocsUrl } from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(swaggerDocsUrl, app, document)

  await app.listen(appConfig.port)
}

bootstrap()
