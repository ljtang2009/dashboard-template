import 'bytenode';
import { initEnv } from '@src-utils/env';
initEnv();
import { bootstrap } from './main';

const runServer = async () => {
  const { port } = await bootstrap();
  console.log(`http://127.0.0.1:${port}`);
};

runServer();
