import { bootstrap } from '@src-api/main';

const runServer = async () => {
  const { port } = await bootstrap();
  console.log(`http://127.0.0.1:${port}`);
};

runServer();
