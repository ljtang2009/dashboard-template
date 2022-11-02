// @ts-nocheck
import 'bytenode';
import { initEnv } from './src-utils/env';
initEnv({ json: true });
// launch.ts最终要编译到src外面
import { bootstrap } from './src-electron-publish/main';

const runServer = async () => {
  const { port } = await bootstrap();
  console.log(`http://127.0.0.1:${port}`);
};

runServer();
