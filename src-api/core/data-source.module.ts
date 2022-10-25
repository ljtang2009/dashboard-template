import 'reflect-metadata';
import { resolve } from 'path';
const dbFilePath = resolve(__dirname, '../../db/main.db');
import { TypeOrmModule } from '@nestjs/typeorm';

export const DataSourceModule = TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: dbFilePath,
  autoLoadEntities: true,
  logging: true,
  logger: 'advanced-console',
});
