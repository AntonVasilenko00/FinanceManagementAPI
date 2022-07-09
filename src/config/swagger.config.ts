import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerDocsUrl = 'api/docs'

const config = new DocumentBuilder()
  .setTitle('FinanceManagement API')
  .setVersion('1.0')
  .build()

export default config
