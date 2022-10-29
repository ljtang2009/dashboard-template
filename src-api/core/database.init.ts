import { resolve as pathResolve } from 'path'
import sqlite3 from 'sqlite3';

function run(db: sqlite3.Database, sql: string, param = {}) {
  return new Promise<void>((resolve, reject) => {
    db.run(sql, param, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

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
    deleted_by TEXT,
    entity_version TEXT
  );`,
  `create unique index IF NOT EXISTS app_config_config_id_uindexs
	on app_config (config_id);`,
];

export default function () {
  return new Promise<void>((resolve, reject) => {
    sqlite3.verbose();
    const db = new sqlite3.Database(pathResolve(process.cwd(), process.env['DB_FILE_Path']!));
    db.serialize(async () => {
      let existError = false;
      for (const sql of sqlList) {
        try {
          await run(db, sql);
        } catch (err) {
          existError = true;
          console.log(err);
          reject(err);
          break;
        }
      }
      db.close();
      if (!existError) {
        resolve();
      }
    });
  });
}
