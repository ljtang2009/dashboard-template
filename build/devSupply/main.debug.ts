import { bootstrap } from './main';

const runServer = async () => {
  const { port: supplyServerPort } = await bootstrap();
  console.log(`http://localhost:${supplyServerPort}`);
};

runServer();
