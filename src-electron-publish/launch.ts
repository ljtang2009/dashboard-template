// @ts-nocheck
// HACK launch.ts最终要编译到src外面, 所以这里import路径是编译后的路径
import 'bytenode';
import { initEnv } from './src-utils/env';
initEnv({ useProperties: true });
import { bootstrap } from './src-electron-publish/main';

const runServer = async () => {
  const { port } = await bootstrap();
  console.log(`http://127.0.0.1:${port}`);
};

runServer();
