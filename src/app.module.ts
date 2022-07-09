import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
