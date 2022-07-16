import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default {
  type: process.env.DB_TYPE || 'postgres',
  url:
    process.env.DB_URL ||
    'postgres://postgres:postgres@localhost:5432/finance-management-app-db',
  entities: ['dist/**/*.entity.js'],
  synchronize: process.env.NODE_ENV !== 'prod',
  autoloadEntities: true,
} as TypeOrmModuleOptions
