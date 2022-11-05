import 'reflect-metadata';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from "typeorm"
import path from 'path'
import sqlcipher from '@journeyapps/sqlcipher'

const sqlList = [
  `create table IF NOT EXISTS app_config
  (
    config_id TEXT not null,
    config_key TEXT not null,
    config_value TEXT not null,
    config_name TEXT,
    created_time TEXT not null,
    created_by TEXT,
    updated_time TEXT,
    updated_by TEXT,
    deleted_time TEXT,
    deleted_by TEXT
  );`,
  `create unique index IF NOT EXISTS app_config_config_id_uindexs
	on app_config (config_id);`,
];

export const DataSourceModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'sqlite',
    database: path.resolve(process.cwd(), process.env['DB_FILE_Path']!),
    driver: sqlcipher,
    logging: true,
    logger: 'advanced-console',
    autoLoadEntities: true,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = new DataSource(options!)
    await dataSource.initialize();
    const encryptKey = process.env['SQLITE_ENCRYPT_KEY']
    const isDevelopment = process.env['NODE_ENV'] === 'development'
    // 非开发环境, 数据库加密
    if (!isDevelopment && encryptKey && typeof (encryptKey) === 'string' && encryptKey.length > 0) {
      await dataSource.query('PRAGMA cipher_compatibility = 4')
      await dataSource.query(`PRAGMA key = '${encryptKey}'`)
    }
    // 初始化数据库
    for (const sql of sqlList) {
      await dataSource.query(sql)
    }
    return dataSource;
  },
})
