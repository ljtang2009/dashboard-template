import 'reflect-metadata';
import { dbFilePath } from '@src-api/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const DataSourceModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: dbFilePath,
  autoLoadEntities: true,
  logging: true,
  logger: 'advanced-console',
});
