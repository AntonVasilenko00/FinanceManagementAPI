import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default {
  type: process.env.DB_TYPE || 'postgres',
  url:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/finance-management-app-db',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  autoloadEntities: true,
} as TypeOrmModuleOptions
