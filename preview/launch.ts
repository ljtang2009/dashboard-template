import { bootstrap } from './main';
import open from 'open';

const runServer = async () => {
  const { port } = await bootstrap();
  const url = `http://127.0.0.1:${port}`;
  open(url);
  console.log(url);
};

runServer();
