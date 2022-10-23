import { bootstrap } from './main';

const runServer = async () => {
  const { port: devConfigServerPort } = await bootstrap();
  console.log(`http://127.0.0.1:${devConfigServerPort}`);
};

runServer();
