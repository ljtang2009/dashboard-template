import { resolve } from 'path';

/**
 * API服务器端口
 */
export const apiServerPort = 8096;

export const dbFilePath = resolve(process.cwd(), './db/main.db');
