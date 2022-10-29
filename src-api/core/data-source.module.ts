import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path'

export const DataSourceModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: resolve(process.cwd(), process.env['DB_FILE_Path']!),
  autoLoadEntities: true,
  logging: true,
  logger: 'advanced-console',
});
